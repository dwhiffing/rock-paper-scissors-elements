interface IconProps {
  className?: string
  width?: number | string
  height?: number | string
  flat?: boolean
}
export const FireIcon = ({
  className,
  width = 150,
  height = 150,
  flat,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_2)">
      {!flat && (
        <circle cx="250" cy="250" r="250" fill="url(#paint0_radial_1_2)" />
      )}
      <circle
        cx="250"
        cy="250"
        r="250"
        fill="#FF1F00"
        fillOpacity="0.52"
        style={{ mixBlendMode: 'color' }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M255.612 426.488C255.612 426.488 190.784 426.488 140.595 382.572C90.4064 338.657 92.4976 305.197 92.4976 305.197C92.4976 305.197 102.954 315.653 121.775 328.201C140.595 340.748 148.96 340.748 148.96 340.748C148.96 340.748 105.045 290.559 109.227 250.826C113.41 211.093 159.416 171.36 159.416 171.36C159.416 171.36 138.504 204.819 146.869 229.914C155.234 255.008 182.42 271.738 182.42 271.738C182.42 271.738 169.872 250.826 171.964 223.64C173.181 207.811 197.087 185.6 218.085 166.091C233.15 152.095 246.718 139.489 249.338 131.627C255.612 112.806 232.609 83.5291 232.609 83.5291C232.609 83.5291 289.071 106.532 305.801 165.086C322.531 223.64 309.983 250.826 309.983 250.826C309.983 250.826 337.169 250.826 358.081 238.279C378.993 225.731 385.267 200.637 385.267 200.637C385.267 200.637 412.453 236.187 389.449 271.738C366.446 307.289 335.078 324.018 335.078 324.018C335.078 324.018 364.355 324.018 389.449 311.471C414.544 298.924 425 280.103 425 280.103C425 280.103 422.909 330.292 366.446 380.481C309.983 430.67 255.612 426.488 255.612 426.488ZM257.703 420.214C257.703 420.214 197.058 416.032 188.693 397.211C183.585 385.717 189.395 377.343 194.694 369.707C198.071 364.839 201.241 360.271 201.241 355.386C201.241 342.839 180.328 336.566 180.328 336.566C180.328 336.566 201.241 332.383 211.697 342.839C222.153 353.295 220.061 363.751 220.061 363.751C220.061 363.751 234.7 347.022 232.609 336.566C231.853 332.79 228.644 329.832 225.146 326.609C218.959 320.907 211.871 314.375 215.879 301.015C222.153 280.103 263.977 269.647 263.977 269.647C263.977 269.647 247.247 290.559 247.247 298.924C247.247 302.87 250.506 304.49 254.827 306.636C259.664 309.04 265.832 312.104 270.25 319.836C278.615 334.474 274.433 349.113 274.433 349.113C274.433 349.113 280.706 334.474 293.254 326.109C305.801 317.745 322.531 319.836 322.531 319.836C322.531 319.836 299.527 334.474 299.527 349.113C299.527 355.235 303.185 359.894 307.135 364.925C312.63 371.925 318.69 379.645 316.257 393.028C312.075 416.032 257.703 420.214 257.703 420.214Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_2"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(385 145) rotate(136.494) scale(406.725)"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.104167" stopColor="#A5A5A5" />
        <stop offset="0.552083" stopColor="#6A6A6A" />
        <stop offset="0.859375" stopColor="#3A3A3A" />
        <stop offset="1" stopColor="#707070" />
      </radialGradient>
      <clipPath id="clip0_1_2">
        <rect width="500" height="500" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const MetalIcon = ({
  className,
  width = 150,
  height = 150,
  flat,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3_50)">
      {!flat && (
        <circle cx="250" cy="250" r="250" fill="url(#paint0_radial_3_50)" />
      )}
      <circle
        cx="250"
        cy="250"
        r="250"
        fill="#BD00FF"
        fillOpacity="0.08"
        style={{ mixBlendMode: 'color' }}
      />
      <path
        d="M112.817 368.583C112.817 368.583 108.473 388.717 120.545 399.821C132.617 410.925 150.969 405.745 150.969 405.745L300.094 243.481L261.465 207.846L112.817 368.583Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
      <path
        d="M263.874 195.504C263.855 199.594 266.926 201.87 266.926 201.87L305.574 237.523C305.574 237.523 307.801 239.755 311.89 239.774C315.98 239.794 317.159 236.996 317.159 236.996L321.18 232.607C321.18 232.607 349.363 263.383 365.117 281.68C380.871 299.976 421.82 348.716 421.82 348.716C421.82 348.716 431.655 316.175 399.948 250.348C368.241 184.522 354.924 174.887 354.924 174.887L354.715 169.384L330.755 147.344L325.57 147.679C325.57 147.679 301.462 120.193 236.733 99.8426C172.003 79.4919 145.926 94.9419 145.926 94.9419C145.926 94.9419 187.095 118.989 218.201 143.52C249.307 168.051 270.186 185.598 270.186 185.598L266.165 189.987C266.165 189.987 263.894 191.415 263.874 195.504Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
      <path
        d="M359.217 164.527L335.256 142.488C335.256 142.488 346.894 130.572 358.415 141.169C369.937 151.767 359.217 164.527 359.217 164.527Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_3_50"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(411.041 159.839) rotate(140.445) scale(416.387)"
      >
        <stop stopColor="#EEEEEE" />
        <stop offset="0.0833333" stopColor="#B5B5B5" />
        <stop offset="0.265625" stopColor="#949494" />
        <stop offset="0.552083" stopColor="#828282" />
        <stop offset="0.859375" stopColor="#464646" />
        <stop offset="1" stopColor="#707070" />
      </radialGradient>
      <clipPath id="clip0_3_50">
        <rect width="500" height="500" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const PlantIcon = ({
  className,
  width = 150,
  height = 150,
  flat,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_4)">
      {!flat && (
        <circle cx="250" cy="250" r="250" fill="url(#paint0_radial_1_4)" />
      )}
      <circle
        cx="250"
        cy="250"
        r="250"
        fill="#00FF19"
        fillOpacity="0.52"
        style={{ mixBlendMode: 'color' }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M212.81 425.667C212.81 425.667 206.245 412.539 201.869 399.411C197.493 386.282 197.493 373.154 197.493 373.154C197.493 373.154 103.408 355.65 96.8435 272.504C90.2794 189.359 302.519 84.3329 302.519 84.3329C302.519 84.3329 403.169 204.675 400.981 279.068C398.793 353.462 245.63 375.342 245.63 375.342C245.63 375.342 245.63 388.47 247.818 401.599C250.006 414.727 254.382 425.667 254.382 425.667H212.81ZM221.561 381.906C221.561 381.906 212.809 362.214 210.621 353.462C208.433 344.71 208.433 325.017 208.433 325.017C208.433 325.017 188.741 305.325 177.801 298.761C166.86 292.197 131.852 290.009 131.852 290.009C131.852 290.009 166.86 281.256 182.177 285.633C197.493 290.009 210.621 300.949 210.621 300.949C210.621 300.949 212.809 285.633 212.809 281.256C212.809 276.88 214.997 261.564 214.997 261.564C214.997 261.564 197.493 241.872 186.553 237.496C175.613 233.12 147.168 233.12 147.168 233.12C147.168 233.12 169.048 224.367 190.929 226.555C212.809 228.744 221.561 241.872 221.561 241.872L230.314 215.615C230.314 215.615 219.373 198.111 208.433 191.547C197.493 184.983 182.177 180.607 182.177 180.607C182.177 180.607 201.869 178.419 212.809 182.795C223.749 187.171 239.066 198.111 239.066 198.111L254.382 167.478L278.45 128.094L260.946 169.666L252.194 195.923C252.194 195.923 280.638 180.607 295.955 180.607C311.271 180.607 337.527 187.171 337.527 187.171C337.527 187.171 315.647 187.171 293.767 191.547C271.886 195.923 243.442 219.991 243.442 219.991L239.066 244.06C239.066 244.06 274.074 228.744 298.143 226.555C322.211 224.367 357.22 244.06 357.22 244.06C357.22 244.06 326.587 237.496 298.143 239.684C269.698 241.872 232.502 270.316 232.502 270.316L228.126 307.513C228.126 307.513 252.194 285.633 287.203 285.633C322.211 285.633 350.656 298.761 350.656 298.761C350.656 298.761 315.647 294.385 287.203 296.573C258.758 298.761 223.749 335.957 223.749 335.957L221.561 381.906Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_4"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(385 145) rotate(136.494) scale(406.725)"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.104167" stopColor="#A5A5A5" />
        <stop offset="0.552083" stopColor="#6A6A6A" />
        <stop offset="0.859375" stopColor="#474747" />
        <stop offset="1" stopColor="#707070" />
      </radialGradient>
      <clipPath id="clip0_1_4">
        <rect width="500" height="500" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const GroundIcon = ({
  className,
  width = 150,
  height = 150,
  flat,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_5)">
      {!flat && (
        <circle cx="250" cy="250" r="250" fill="url(#paint0_radial_1_5)" />
      )}
      <circle
        cx="250"
        cy="250"
        r="250"
        fill="#C56A00"
        fillOpacity="0.52"
        style={{ mixBlendMode: 'color' }}
      />
      <path
        d="M80.8271 358.57L72.0625 278.613L174.52 126.428L325.797 112.456L321.454 238.224L160.431 375.946L80.8271 358.57Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
      <path
        d="M353.949 109.37L345.052 240.858L392.503 295.692L427.499 260.533L359.068 108.809L353.949 109.37Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
      <path
        d="M331.959 263.175L373.725 313.412L281.832 396.572L197.109 379.757L331.959 263.175Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_5"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(385 145) rotate(136.494) scale(406.725)"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.104167" stopColor="#A5A5A5" />
        <stop offset="0.552083" stopColor="#6A6A6A" />
        <stop offset="0.859375" stopColor="#474747" />
        <stop offset="1" stopColor="#707070" />
      </radialGradient>
      <clipPath id="clip0_1_5">
        <rect width="500" height="500" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export const WaterIcon = ({
  className,
  width = 150,
  height = 150,
  flat,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_6)">
      {!flat && (
        <circle cx="250" cy="250" r="250" fill="url(#paint0_radial_1_6)" />
      )}
      <circle
        cx="250"
        cy="250"
        r="250"
        fill="#00D1FF"
        fillOpacity="0.52"
        style={{ mixBlendMode: 'color' }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M252.595 425.016C174.715 425.016 34.9299 321.213 136.773 179.663C238.617 38.1134 386.389 106.529 386.389 106.529C386.389 106.529 370.414 99.4516 344.454 106.529C318.494 113.607 295.257 167.867 312.503 212.691C318.975 229.512 330.994 245.004 342.853 260.288C362.595 285.735 381.893 310.609 374.408 340.086C362.426 387.269 330.475 425.016 252.595 425.016ZM210.66 408.502C186.697 396.706 166.728 377.833 170.721 370.755C174.715 363.678 196.681 366.037 224.638 377.833C252.595 389.628 268.571 401.424 266.574 410.861C264.577 420.297 234.623 420.297 210.66 408.502Z"
        fill="#1E1E1E"
        style={{ mixBlendMode: 'overlay' }}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_6"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(385 145) rotate(136.494) scale(406.725)"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset="0.104167" stopColor="#A5A5A5" />
        <stop offset="0.552083" stopColor="#6A6A6A" />
        <stop offset="0.859375" stopColor="#474747" />
        <stop offset="1" stopColor="#707070" />
      </radialGradient>
      <clipPath id="clip0_1_6">
        <rect width="500" height="500" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const Icons = () => (
  <div className="flex gap-x-4">
    <FireIcon />
    <MetalIcon />
    <PlantIcon />
    <GroundIcon />
    <WaterIcon />
  </div>
)

export const Icon = (props: {
  value: number
  className?: string
  flat?: boolean
  width?: number | string
  height?: number | string
}) => {
  const Component = ICONS[props.value]
  if (!Component) return null
  return (
    <Component
      className={props.className}
      width={props.width}
      height={props.height}
      flat={props.flat}
    />
  )
}

export const ICONS = [FireIcon, MetalIcon, PlantIcon, GroundIcon, WaterIcon]
