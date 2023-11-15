import {computed} from "vue";

export type TTransformerItem = {
    title: string
    dataStrList: string[]
    dataLengthRatio: number
    hasZeroNumber: boolean
    disabled?: boolean
    tip?: string
}
/**
 * 本定义处理只有单数字概念，最小0，最大9
 */
export const transformerList: TTransformerItem[] = [
    {
        title: "普通数字",
        dataStrList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        dataLengthRatio: 1,
        hasZeroNumber: true,
    },
    {
        title: "蓝色背景数字符号",
        // 这个符号编码在不同系统上显示会稍有差异
        dataStrList: ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
        dataLengthRatio: 3,
        hasZeroNumber: true,
        disabled: true
    },
    {
        title: "汉字序号",
        dataStrList: ["㈠", "㈡", "㈢", "㈣", "㈤", "㈥", "㈦", "㈧", "㈨", "㈩"],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "汉字序号（大写）",
        dataStrList: ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "罗马数字（小写）",
        dataStrList: ["ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ",],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "罗马数字（大写）",
        dataStrList: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ",],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "圆圈数字",
        dataStrList: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨",],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "数字（带括号）",
        dataStrList: ["⑴", "⑵", "⑶", "⑷", "⑸", "⑹", "⑺", "⑻", "⑼",],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
    {
        title: "上标数字",
        dataStrList: ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹",],
        dataLengthRatio: 1,
        hasZeroNumber: true,
    },
    {
        title: "下标数字",
        dataStrList: ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉",],
        dataLengthRatio: 1,
        hasZeroNumber: true,
    },
    {
        title: "数字序号",
        dataStrList: ["⒈", "⒉", "⒊", "⒋", "⒌", "⒍", "⒎", "⒏", "⒐",],
        dataLengthRatio: 1,
        hasZeroNumber: false,
    },
]

export const renderTransformerList = computed(() => {
    return transformerList.filter(item => !item.disabled)
})
