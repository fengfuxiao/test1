// 更换主题

import { themes } from "./module"

// 修改页面的样式值
const changeStyle = (obj) => {
    // console.log(document.getElementsByTagName("body")[0])
    for(let key in obj) {
        document.getElementsByTagName("body")[0].style.setProperty(`--${key}`, obj[key])
    }
}

// 改变主题的方法
export const setTheme = (themeName) => {
    // 把主题样式持久化
    localStorage.setItem("theme", themeName)
    const themeConfig = themes[themeName]
    // 如果有主题名称，则采用自己定义的主题
    if(themeConfig) {
        localStorage.setItem("primaryColor", themeConfig.primaryColor)
        localStorage.setItem("primaryTextColor", themeConfig.primaryTextColor)
        localStorage.setItem("primaryCardColor", themeConfig.primaryCardColor)
        localStorage.setItem("primaryHeaderColor", themeConfig.primaryHeaderColor)
        localStorage.setItem("primaryHeaderTextColor", themeConfig.primaryHeaderTextColor)
        localStorage.setItem("primaryTableColor", themeConfig.primaryTableColor)
        changeStyle(themeConfig)
    } else {
        // 如果形参没有值则，使用localstorage里的样式数据
        let themeConfig = {
            primaryColor: localStorage.getItem("primaryColor"),
            primaryTextColor: localStorage.getItem("primaryTextColor"),
            primaryCardColor: localStorage.getItem("primaryCardColor"),
            primaryHeaderColor: localStorage.getItem("primaryHeaderColor"),
            primaryHeaderTextColor: localStorage.getItem("primaryHeaderTextColor"),
            primaryTableColor: localStorage.getItem("primaryTableColor")
        }
        changeStyle(themeConfig)
    }
}