<template>
  <div class="map">
    <div id="container"></div>

    <div id="panel"></div>

    <el-input v-model="value" @change="searchMap" placeholder="请输入" style="width: 280px;"></el-input>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: "1b08379c131a969068c97738a303a587",
};
var map = null;

export default {
  name: "gaode",
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "c5d05179cab46aceac928f38b0d9f3db", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.ToolBar"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          map = new AMap.Map("container", {
            zoom: 12, //初始化层级
            // rotateEnable: true,
            // pitchEnable: true,
            // pitch: 50,
            // rotation: -15,
            // zooms: [0, 18], //设置地图级别范围
            vieMode: "3D", //使用3D视图
            center: [116.397428, 39.90923], //中心点坐标
            terrain: true, // 开启地形图
            layers: [
              AMap.createDefaultLayer(),
              //使用多个图层
              //   new AMap.TileLayer.Satellite(), //显示山区
              //   new AMap.TileLayer.RoadNet(), //显示交通道路
            ],
          });
          //   ----------挂载事件
          map.on("complete", function () {
            console.log("地图加载完毕");
            // var trafficLayer = new AMap.TileLayer.Traffic({
            //   zIndex: 10,
            // });
            // map.add(trafficLayer); //动态加载图层
          });
          var marker = new AMap.Marker({
            position: [116.39, 39.9], //位置
          });
          map.add(marker); //添加到地图
          var lineArr = [
            [116.368904, 39.913423],
            [116.382122, 39.901176],
            [116.387271, 39.912501],
            [116.398258, 39.9046],
          ];
          var polyline = new AMap.Polyline({
            path: lineArr, //设置线覆盖物路径
            strokeColor: "#3366FF", //线颜色
            strokeWeight: 5, //线宽
            strokeStyle: "solid", //线样式
          });
          map.add(polyline);

          // 给标记添加事件
          var infoWindow = new AMap.InfoWindow({
            //创建信息窗体
            isCustom: true, //使用自定义窗体
            content: "<div style='background:yellow'>我在这个呢</div>", //信息窗体的内容可以是任意html片段
            offset: new AMap.Pixel(16, -45),
          });
          // 给标记添加事件
          marker.on("click", (e) => {
            console.log("e", e);
            infoWindow.open(map, e.target.getPosition());
          });
          map.setMapStyle("amap://styles/grey");
          // 插件
          // 同步加载 需要plugins中配置
          // var toolbar = new AMap.ToolBar();
          // map.addControl(toolbar);

          // // 异步批量加载
          // AMap.plugin(["AMap.MouseTool",'AMap.HawkEye'], function () {
          //   //异步同时加载多个插件
          //   var mouseTool = new AMap.MouseTool();
          //     map.addControl(mouseTool);
          //   var hawkEye = new AMap.HawkEye();
          //     map.addControl(hawkEye);
          // });

          AMap.plugin(["AMap.PlaceSearch"], () => {
            //构造地点查询类
            this.placeSearch = new AMap.PlaceSearch({
              pageSize: 5, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "010", // 兴趣点城市
              // citylimit: true, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              panel: "panel", // 结果列表将在此容器中进行展示。
              autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            //关键字查询
            this.placeSearch.search("北京大学", (status, result) => {
              console.log("res", result);
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchMap(){
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
         this.placeSearch.search(this.value)
      },1000)
     
    }
  },
};
</script>

<style lang='scss' scoped>
.map {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  .el-input{
  position: absolute;
   top: 10px;
    right: 10px;
  }
  #container {
    width: 100%;
    min-height: calc(100vh - 50px);
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 50px;
    right: 10px;
    width: 280px;
  }
}
</style>