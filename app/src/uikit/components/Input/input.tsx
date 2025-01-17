import css from "./input.module.less";


interface IInput {
    size?: "sm",
    placeholder?: string,
    label?: string,
    hint?: string,
    width?: number,
    error?: boolean,
}

export const Input = (props: IInput) => {
    return (
        <>
            <div class={css["wrapper"]}>
                {props.label
                    && <p class={css["label"]}>{props.label}</p>
                }
                <input
                    type="text"
                    placeholder={props.placeholder}
                    class={css["input"]}
                    classList={{
                        [css["error"]]: props.error
                    }}
                />
                {props.hint
                    && <p
                            class={css["hint"]}
                            classList={{
                                [css["error"]]: props.error
                            }}
                        >
                            {props.hint}
                        </p>
                }
            </div>
        </>
    )
}
