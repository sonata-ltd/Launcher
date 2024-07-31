import { Svg } from "hywer/x/html";

interface IDoneIcon {
    style?: string,
    id?: string,
}

export default function DoneIcon(props: IDoneIcon) {
    return (
        <Svg>
            <svg style={props.style} id={props.id} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1179_276)">
                    <path d="M6.25002 10.0001L8.75002 12.5001L13.75 7.50008M18.3334 10.0001C18.3334 14.6025 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6025 1.66669 10.0001C1.66669 5.39771 5.39765 1.66675 10 1.66675C14.6024 1.66675 18.3334 5.39771 18.3334 10.0001Z" stroke="black" stroke-opacity="0.85" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_1179_276">
                        <rect width="20" height="20" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </Svg>
    )
}
