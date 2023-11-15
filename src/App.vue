<template>
    <div id="container">
        <div class="transformer-item" v-for="(item, index) in renderTransformerList" :key="index">
            <div class="legend">
                <b>{{ item.title }}</b>
                <span>{{ item.dataStrList.join(" ") }}</span>
                <span class="tip" :title="item.tip" @click="popTip(item.tip)">?</span>
            </div>
            <div class="content">
                <textarea v-model.trim="form[index].value" rows="3"></textarea>
                <button @click="copyContent(form[index].value)">复制</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {renderTransformerList, TTransformerItem} from "@/App";
import {ref, watch} from "vue";

const constructForm = () => {
    return renderTransformerList.value.map(item => {
        return {
            value: "",
            transformer: item
        }
    })
}
const form = ref(constructForm())


const popTip = (tip: string) => alert(tip ? tip : "暂无相关说明")
const copyContent = (v: string) => {
    try {
        navigator.clipboard.writeText(v)
        alert("已复制到剪切板")
    } catch (e) {
        alert(e)
    }
}

/**
 * 找出变化项的index
 */
const pickDiffIndex = () => {
    const lengthIndexRecordList: { [index: string]: number[] } = {}
    form.value.forEach((item, index) => {
        const vl = computeDataLength(item.value, item.transformer)
        if (!lengthIndexRecordList[vl]) {
            lengthIndexRecordList[vl] = []
        }
        lengthIndexRecordList[vl].push(index)
    })
    const diffIndexRecordList = Object.values(lengthIndexRecordList).filter(l => l.length === 1)
    return diffIndexRecordList.length ? diffIndexRecordList[0][0] : -1
}

const computeDataLength = (value: string, {dataLengthRatio}: TTransformerItem) => value.length / dataLengthRatio

const updateTransValue = (value: string, item: TTransformerItem, diffItem: TTransformerItem) => {
    const {dataStrList, hasZeroNumber} = item
    let indexOffset: number
    if (diffItem.hasZeroNumber) {
        indexOffset = hasZeroNumber ? 0 : -1
    } else {
        indexOffset = hasZeroNumber ? 1 : 0
    }
    const vSplit = value.split("")
    // 形如3️⃣的字符单个长度不是一个长度，不能直接用来split处理
    // for(let index=0; index < vSplit.length; index += diffItem.dataLengthRatio) {
    //     const s = vSplit.slice(index, diffItem.dataLengthRatio).join("")
    //     const matchIndex = diffItem.dataStrList.indexOf(s)
    //     if(matchIndex >= 0 && dataStrList[matchIndex + indexOffset]) {
    //         vSplit.splice(index, 1, dataStrList[matchIndex + indexOffset])
    //     }
    // }
    vSplit.forEach((s, index) => {
        const matchIndex = diffItem.dataStrList.indexOf(s)
        if (matchIndex >= 0 && dataStrList[matchIndex + indexOffset]) {
            vSplit.splice(index, 1, dataStrList[matchIndex + indexOffset])
        }
    })
    return vSplit.join("")
}
const update = () => {
    const diffIndex = pickDiffIndex()
    if (diffIndex >= 0) {
        console.log("变化的是", renderTransformerList.value[diffIndex].title)
        const diffItem = form.value[diffIndex]
        const value = diffItem.value
        let formCopy = JSON.parse(JSON.stringify(form.value))
        renderTransformerList.value.forEach((item, index) => {
            if (index !== diffIndex) {
                formCopy[index].value = updateTransValue(value, item, diffItem.transformer)
            }
        })
        console.log(formCopy)
        form.value = [...formCopy]
    }
}

watch(() => form.value, () => {
    update()
}, {deep: true})
</script>

<style lang="scss">
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
}

#container {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;;
    color: #2c3e50;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    font-size: 16px;
}

div.transformer-item {
    width: 100%;

    > * {
        width: 100%;
    }

    > .legend {
        padding: 8px;
        box-sizing: border-box;

        > * {
            margin-right: 16px;
        }

        > .tip {
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
            background-color: #c0c0c0;
            color: #f0f0f0;
            cursor: help;
        }
    }

    > .content {
        position: relative;

        > textarea {
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            font-size: 16px;
            border: 1px solid #999;
            outline: none;
            transition: all ease .1s;
            padding: 8px;

            &:focus {
                border: 1px solid lightskyblue;
            }
        }

        > button {
            position: absolute;
            right: 1px;
            top: 1px;
            border: 0;
            padding: 3px 12px;
            box-shadow: 0 0 3px #999;
            border-radius: 0 0 0 5px;

            &:active {
                box-shadow: 0 0 3px;
            }
        }
    }
}
</style>
