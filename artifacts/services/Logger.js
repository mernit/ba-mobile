//
// Inspired by the Logz.io Node.js logging code:
//   https://github.com/logzio/logzio-nodejs/blob/master/lib/logzio-nodejs.js
// Additional inspiration from react-native-device-log:
//   https://github.com/olofd/react-native-device-log/blob/master/debug-service.js
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Moment from 'moment';
import fetch from 'react-native-fetch-polyfill';
import { AppState, NetInfo } from 'react-native';
import SleepUtil from './SleepUtil';
export var LogLevel;
(function (LogLevel) {
    LogLevel["Trace"] = "trace";
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warning"] = "warning";
    LogLevel["Error"] = "error";
    LogLevel["None"] = "none";
})(LogLevel || (LogLevel = {}));
export class LogOptions {
    constructor() {
        this.logzToken = '';
        this.logzType = 'rn';
        this.sendIntervalMs = 2000;
        this.bufferSize = 100;
        this.timeoutMs = 10000;
        this.protocol = 'https';
        this.level = LogLevel.Info;
        this.toConsole = false;
        this.deviceId = '';
        this.bundleId = '';
        this.logAppState = false;
        this.logNetState = false;
        this.logRNErrors = false;
    }
}
export default class Logger {
    //
    // Private helpers
    //
    constructor(options) {
        this.urlBase = 'https://listener.logz.io:8071/';
        this.closed = false;
        this.hasBeenDisconnected = false;
        this.hasConnectionBeenEstablished = false;
        // @ts-ignore
        this.timer = -1;
        this.messages = new Array();
        this.options = new LogOptions();
        for (let prop in options) {
            if (options.hasOwnProperty(prop)) {
                this.options[prop] = options[prop];
            }
        }
        this.setupEnabledLevels(options.level);
        this.periodicUploaderAsync = this.periodicUploaderAsync.bind(this);
        Logger._theLogger = this;
        if (this.options.logNetState) {
            NetInfo.addEventListener('connectionChange', this.netInfoConnectionChange.bind(this));
        }
        if (this.options.logAppState) {
            AppState.addEventListener('change', this.appStateChange.bind(this));
        }
        if (this.options.logRNErrors) {
            this.setupRNErrorLogging();
        }
        // Start the periodic uploads if Logz.io token was provided
        if (this.options.logzToken && this.options.logzToken !== '') {
            this.periodicUploaderAsync();
        }
    }
    static CreateLogger(options) {
        if (Logger._theLogger !== undefined) {
            // This should only be called once
            return;
        }
        // Create the logger
        // tslint:disable-next-line:no-unused-expression
        new Logger(options);
    }
    //
    // Static helper functions (fetch the instance for the caller)
    //
    static trace(message) {
        Logger.instance.log(LogLevel.Trace, message);
    }
    static debug(message) {
        Logger.instance.log(LogLevel.Debug, message);
    }
    static info(message) {
        Logger.instance.log(LogLevel.Info, message);
    }
    static warning(message) {
        Logger.instance.log(LogLevel.Warning, message);
    }
    static error(message) {
        Logger.instance.log(LogLevel.Error, message);
    }
    //
    // Private static helpers
    //
    static addTimeStamp(msg) {
        msg['@timestamp'] = msg['@timestamp'] || (new Date()).toISOString();
    }
    static safeObjectToJSON(input) {
        try {
            return JSON.stringify(input);
        }
        catch (error) {
            console.log(`Logger - Exception serializing log messages: ${error}`);
            return '';
        }
    }
    //
    // Public interface
    //
    log(level, message) {
        // Wrap a string with an Object
        if (typeof message === 'string') {
            message = { message: message };
        }
        if (this.levelStatuses[level] === true) {
            if (this.options.toConsole) {
                console.log(`${Moment().format('HH:mm:ss.SS')} - ${level.toString()} - ${message.message}`);
            }
            message.level = level.toString();
            this.logInternal(message);
        }
    }
    trace(message) {
        this.log(LogLevel.Trace, message);
    }
    debug(message) {
        this.log(LogLevel.Debug, message);
    }
    info(message) {
        this.log(LogLevel.Info, message);
    }
    warning(message) {
        this.log(LogLevel.Warning, message);
    }
    error(message) {
        this.log(LogLevel.Error, message);
    }
    setupEnabledLevels(level) {
        switch (level) {
            case LogLevel.None:
                this.levelStatuses = { 'error': false, 'warning': false, 'info': false, 'debug': false, 'trace': false };
                break;
            case LogLevel.Error:
                this.levelStatuses = { 'error': true, 'warning': false, 'info': false, 'debug': false, 'trace': false };
                break;
            case LogLevel.Warning:
                this.levelStatuses = { 'error': true, 'warning': true, 'info': false, 'debug': false, 'trace': false };
                break;
            case LogLevel.Info:
                this.levelStatuses = { 'error': true, 'warning': true, 'info': true, 'debug': false, 'trace': false };
                break;
            case LogLevel.Debug:
                this.levelStatuses = { 'error': true, 'warning': true, 'info': true, 'debug': true, 'trace': false };
                break;
            case LogLevel.Trace:
                this.levelStatuses = { 'error': true, 'warning': true, 'info': true, 'debug': true, 'trace': true };
                break;
            default:
                this.levelStatuses = { 'error': true, 'warning': true, 'info': false, 'debug': false, 'trace': false };
        }
    }
    periodicUploaderAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                if (this.messages.length > 0) {
                    console.log(`Logger.periodicUploader - Sending ${this.messages.length} messages`);
                    yield this.sendAsync();
                }
                yield SleepUtil.SleepAsync(this.options.sendIntervalMs);
            }
        });
    }
    logInternal(msg) {
        if (this.closed) {
            throw new Error('Logger is already closed');
        }
        // TODO: Copy extraFields if needed
        Logger.addTimeStamp(msg);
        // Add device id, if specified
        if (this.options.deviceId && this.options.deviceId.length > 0) {
            msg.deviceId = this.options.deviceId;
        }
        // Add bundle id, if specified
        if (this.options.bundleId && this.options.bundleId.length > 0) {
            msg.bundleId = this.options.bundleId;
        }
        if (msg && msg !== '') {
            this.messages.push(msg);
        }
        // Check if it's time to send
        if (this.messages.length >= this.options.bufferSize) {
            // this.debug('Logger - Buffer is full, sending messages');
            this.sendAsync();
        }
    }
    payload() {
        let payload = '';
        for (let i = 0; i < this.messages.length; i++) {
            let message = Logger.safeObjectToJSON(this.messages[i]);
            if (message === '')
                continue;
            payload += message + '\n';
        }
        return payload;
    }
    sendAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Bail if we're not configured for upload
                if (!this.options.logzToken || this.options.logzToken === '') {
                    // Clear the buffer
                    this.messages = new Array();
                    return;
                }
                const payload = this.payload();
                // Blank out the pending messages
                this.messages = new Array();
                const headers = {
                    'Accept': '*/*',
                    'Content-Type': 'text/plain',
                };
                const url = this.urlBase + `?token=${encodeURIComponent(this.options.logzToken)}&type=${encodeURIComponent(this.options.logzType)}`;
                /* if  (this.options.deviceId.length > 0) {
                    url += `&deviceId=${encodeURIComponent(this.options.deviceId)}`;
                } */
                // Send the request
                const result = (yield fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: payload,
                }));
                // TODO: Eventually care about retrying if it fails...
                // NOTE: This just drops a chunk of logs on the floor if the upload fails
                if (!result.ok) {
                    console.log(`Logger - Response not ok: ${result.status}`);
                }
                else {
                    console.log('Logger - Upload appears to have worked');
                }
            }
            catch (error) {
                console.log(`Logger - Exception during upload: ${JSON.stringify(error)}`);
            }
        });
    }
    //
    // Private handlers for NetInfo, AppState, RN Errors
    //
    netInfoConnectionChange(info) {
        // NOTE: NetInfoReturnType is really just an OR of string constants
        // NOTE: Android returned none as 'NONE' while iOS returns none as 'none', etc.
        let infoCaps = info.type.toUpperCase();
        if (infoCaps === 'NONE') {
            this.hasBeenDisconnected = true;
            this.log(LogLevel.Info, 'NetInfo - Disconnected');
        }
        else {
            if (this.hasBeenDisconnected) {
                this.hasBeenDisconnected = false;
                this.log(LogLevel.Info, `NetInfo - Reconnected: ${JSON.stringify(info)}`);
            }
            else {
                if (this.hasConnectionBeenEstablished) {
                    this.log(LogLevel.Info, `NetInfo - Changed: ${JSON.stringify(info)}`);
                }
                else {
                    this.log(LogLevel.Info, `NetInfo - Connection: ${JSON.stringify(info)}`);
                }
            }
            this.hasConnectionBeenEstablished = true;
        }
    }
    appStateChange(currentAppState) {
        this.log(LogLevel.Info, `AppState - Changed: ${currentAppState}`);
    }
    setupRNErrorLogging() {
        if (!ErrorUtils)
            return;
        const defaultHandler = ErrorUtils.getGlobalHandler();
        if (defaultHandler) {
            ErrorUtils.setGlobalHandler((error, isFatal) => {
                // TODO: Parse the error stack, if desired
                this.RNError(isFatal, error.message);
                if (defaultHandler)
                    defaultHandler(error, isFatal);
            });
        }
    }
    RNError(fatal, message) {
        if (fatal) {
            this.error(`RNFatal - ${message}`);
        }
        else {
            this.error(`RNError - ${message}`);
        }
    }
    //
    // Public static interface
    //
    static get instance() {
        return Logger._theLogger;
    }
}
//# sourceMappingURL=Logger.js.map