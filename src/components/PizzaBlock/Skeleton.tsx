import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton= () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={260}
        height={500}
        viewBox="0 0 260 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="123" cy="123" r="123" />
        <rect x="0" y="261" rx="0" ry="0" width="260" height="24" />
        <rect x="0" y="302" rx="10" ry="10" width="260" height="88" />
        <rect x="0" y="421" rx="10" ry="10" width="90" height="27" />
        <rect x="108" y="411" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton;
