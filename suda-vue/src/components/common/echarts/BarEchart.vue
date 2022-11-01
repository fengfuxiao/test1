<!-- @format -->

<template>
  <div id="bar" class="bar"></div>
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

export default {
  name: "BarEchart",
  data() {
    return {};
  },
  methods: {},
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
  mounted() {
    // const setEchartWH = {
    //   width: "100%",
    //   height: 400,
    // };
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    let myChart = echarts.init(document.getElementById("bar"));
    // 中间的用户面板集合
    let option = {
      title: {
        text: "用户访问量",
        x: "center",
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: [23, 24, 18, 25, 27, 28, 25],
          barWidth: 60,
          emphasis: {
            itemStyle: {
              shadowBlur: 2,
              shadowOffsetX: 0,
              shadowColor: "",
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style scoped lang="less">
#bar {
  height: 400px;
}
</style>
