<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script>
var map = null;

export default {
  name: "baidu",
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
      map = new BMap.Map("container", {
        coordsType: 5, // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
      });
      // map.setMapStyleV2({
      //   styleId: "82895b7d2a0df53f0a34d1b262adf5ff",
      // });
      var point = new BMap.Point(116.404, 39.915);
      var opts = { type: BMAP_NAVIGATION_CONTROL_LARGE };

      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl(opts));
      // map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
      // 样式iID
      map.setMapStyleV2({
        styleId: "82895b7d2a0df53f0a34d1b262adf5ff",
      });

      // 创建经纬度

      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 15); //定位到点位
      var marker = new BMap.Marker(point); // 创建标 注
      map.addOverlay(marker); // 将标注添加到地图中

      marker.addEventListener("click", function () {
        alert("您点击了标注");
      });
      marker.enableDragging();
      marker.addEventListener("dragend", function (e) {
        alert("当前位置：" + e.point.lng + ", " + e.point.lat);
      });

      var polyline = new BMap.Polyline(
        [new BMap.Point(116.399, 39.91), new BMap.Point(116.405, 39.92)],
        { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }
      );
      map.addOverlay(polyline);
      // window.setTimeout(function () {
      //   map.panTo(new BMap.Point(116.409, 39.918));
      // }, 2000);
    },

    searchMap() {},
  },
};
</script>

<style lang='scss' scoped>
.map {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  .el-input {
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