<!-- @format -->

<template>
  <div id="pie" class="pie"></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

import { getUserAddress } from "../../../api/user.js"

export default {
  name: "PieEchart",
  // props: ["useraddressList"],
  data() {
    return {
      useraddressList: []
    };
  },
  methods: {},
  watch: {},
  created() {
    // 注册必须的组件
    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      BarChart,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
  },
  async mounted() {
    // 获取用户访问来源
    const useraddressData = await getUserAddress()
    if(useraddressData.data.status === 0) {
      this.useraddressList.push(...useraddressData.data.data)
    }
    // const setEchartWH = {
    // width: "100%",
    // height: 400
    // }
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    let myChart = echarts.init(document.getElementById("pie"));
    // 中间的用户面板集合
    let option = {
      title: {
        text: "用户访问来源",
        x: "center",
      },
      legend: {
        orient: "vertival",
        x: "left",
      },
      series: [
        {
          type: "pie",
          label: {
            label: {
              show: true,
            },
          },
          data: this.useraddressList,
          radius: "50%",
        },
      ],
      color: [
        "#32C5E9",
        "#FFDB5C",
        "#ff9f7f",
        "#fb7293",
        "#E062AE",
        "#E690D1",
        "#e7bcf3",
        "#9d96f5",
        "#8378EA",
        "#96BFFF",
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style scoped lang="less">
#pie {
  height: 400px;
}
</style>
