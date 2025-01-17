import { Accessor, createContext, ParentProps, Setter, useContext } from "solid-js"
import { createStore } from "solid-js/store";
import { codes, CSSMarks } from "./codes";
import { defaultLoggerSettings, LoggerSettingsType } from "./options";


type Store = [
    {
        log: (option: string, msg: string) => void,
        logw: (option: string, msg: string) => void
    },
    LoggerSettingsType,
    Setter<LoggerSettingsType>
]

const LoggerContext = createContext<Store>();

export const LoggerProvider = (props: ParentProps) => {
    const [loggerSettings, setLoggerSettings] = createStore<LoggerSettingsType>(defaultLoggerSettings)

    const getTimestamp = () => {
        const date = new Date();

        const timestamp = date.toISOString().split('.')[0];

        return timestamp;
    }

    const formatOutputLog = (component: string, msg: string) => {
        return [ `${getTimestamp()} %c[${component}]`, CSSMarks.component, `> ${msg}` ];
    }

    const getComponentInfo = (option: string): [string, boolean, boolean] | [undefined] => {
        if (!loggerSettings.enable) {
            return [undefined];
        }

        const keys = option.split('.');
        let result: any = loggerSettings;

        const componentName = keys[0];
        const enabled = result[componentName].enable;
        const name = result[componentName].name;

        for (const key of keys) {
            result = result?.[key];
        }

        if (name && enabled) {
            return [name, enabled, result];
        } else {
            return [undefined]
        }
    }

    const output = (warn: boolean, option: string, msg: string) => {
        const [name, enabled, result] = getComponentInfo(option);

        if (name && enabled && result) {
            const [f, s, t] = formatOutputLog(name, msg);

            if (!warn) {
                console.log(f, s, t);
            } else {
                console.warn(f, s, t);
            }
        }
    }

    const store: Store = [
        {
            log(option: string, msg: string) {
                output(false, option, msg);
            },

            logw(option: string, msg: string) {
                output(true, option, msg);
            }
        },
        loggerSettings,
        setLoggerSettings,
    ];

    return (
        <LoggerContext.Provider value={store}>
            {props.children}
        </LoggerContext.Provider>
    )
}

export const useLogger = () => {
    const context = useContext(LoggerContext);

    if (!context) {
      throw new Error("useLogger must be used inside LoggerProvider");
    }

    return context;
}
