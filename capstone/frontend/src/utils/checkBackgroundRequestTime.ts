import { REFRESH_TOKEN_LIFETIME } from "../hooks/useRefreshToken"

const checkBackgroundRequestTime = (refetch: ()=>void) => {
    const lastLoginTime = localStorage.getItem('lastLoginTime')

    if (lastLoginTime) {
        const currentTime = new Date().getTime()
        const timeElapsed = currentTime - parseInt(lastLoginTime)
        const timeLeft = REFRESH_TOKEN_LIFETIME - (timeElapsed % REFRESH_TOKEN_LIFETIME)
        console.log(timeLeft, timeElapsed)

       setTimeout(() => {
            refetch()
            const intervalId = setInterval(()=>{refetch()}, REFRESH_TOKEN_LIFETIME)
            localStorage.setItem('intervalId', intervalId.toString())
        }, timeLeft);
    }

}

export default checkBackgroundRequestTime