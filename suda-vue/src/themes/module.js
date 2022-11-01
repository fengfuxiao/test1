// 主题模块

export const themes = {
    // 默认主题
    default: {
        primaryColor: `${16}, ${38}, ${66}`,
        // primaryColor: "#000",
        primaryTextColor: `${255}, ${255}, ${255}`,
        primaryCardColor: `${255}, ${255}, ${255}`,
        primaryHeaderColor: `${255}, ${255}, ${255}`,
        primaryHeaderTextColor: `${0}, ${0}, ${0}`,
        primaryTableColor: `${255}, ${255}, ${255}`,
    },
    // 黑色主题
    dark: {
        primaryColor: `${0}, ${0}, ${0}`,
        primaryTextColor: `${255}, ${255}, ${255}`,
        primaryCardColor: `${0}, ${0}, ${0}`,
        primaryHeaderColor: `${0}, ${0}, ${0}`,
        primaryHeaderTextColor: `${255}, ${255}, ${255}`,
        primaryTableColor: `${0}, ${0}, ${0}`,
    },
    // 浅色主题
    light: {
        primaryColor: `${255}, ${255}, ${255}`,
        primaryTextColor: `${0}, ${0}, ${0}`,
        primaryCardColor: `${255}, ${255}, ${255}`,
        primaryHeaderColor: `${255}, ${255}, ${255}`,
        primaryHeaderTextColor: `${0}, ${0}, ${0}`,
        primaryTableColor: `${255}, ${255}, ${255}`,
    }
}