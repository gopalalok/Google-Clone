import React from 'react'

const Avatar = ({url,className}) => {
    return <img loading="lazy" className={`h-10 rounded-full cursor-pointer trasition duration-150 transform hover:scale-110 ${className}`} loading="lazy" src={url} alt="profile pic" />
}

export default Avatar
