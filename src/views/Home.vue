<template>
  <div class="home">
    <header></header>
    <section>
      <div class="left-pannel">
        <div class="left-top">
          <p class="title-text">油耗排行榜</p>
          <div class="content"></div>
        </div>
        <div class="left-bottom">
          <p class="title-text">月平均油耗统计</p>
          <div class="content"></div>
        </div>
      </div>

      <div class="center-pannel">
        <div class="search">
          <div class="search-left">
            <span>车牌号</span>
            <img src="../assets/images/圆角矩形 1 拷贝 8@2x.png" alt />
          </div>
          <div class="search-right">
            <input class="search-input" type="text" />
          </div>
        </div>
        <div class="search-result"></div>
      </div>
      <div class="right-pannel">
        <div class="right-top">
          <p class="title-text">报警统计</p>
          <div class="content"></div>
        </div>
        <div class="right-center">
          <p class="title-text">保险理赔</p>
          <div class="content"></div>
        </div>
        <div class="right-bottom">
          <p class="title-text">路况感知</p>
          <div class="content"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #080919;
}
header {
  height: 11.87%;
  background: url("../assets/images/小马国炬调度中心@2x.png") no-repeat center
    center;
  background-size: contain;
}
section {
  height: calc(~"100% - 11.87%");
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  & > .left-pannel {
    width: 450px;
    height: 100%;
    // float: left;
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > .left-top {
      flex: 3;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      display: flex;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 7;
      }
    }
    & > .left-bottom {
      flex: 7;
      box-sizing: border-box;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;
      background: url("../assets/images/ypjyh@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 16;
      }
    }
  }

  & > .center-pannel {
    width: calc(~"100% - 900px");
    box-sizing: border-box;
    padding: 0 30px;
    padding-bottom: 15px;
    .search {
      height: 65px;
      display: flex;
      .search-left {
        flex: 1;
        background: url("../assets/images/矩形 414 拷贝 7@2x.png") no-repeat
          center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
        font-family: Source Han Serif CN;
        font-weight: 300;
        color: rgba(195, 202, 217, 1);
      }
      .search-right {
        flex: 4;
        background: url("../assets/images/边框@2x.png") no-repeat center center;
        background-size: 100% 85%;
        .search-input {
          background: transparent;
          border: 0;
          width: 100%;
          height: 85%;
          text-decoration: 20em;
          font-size: 20px;
          color: transparent;
          padding-left: 2em;
          text-shadow: 0 0 0 white;
        }
        .search-input:focus {
          border: 0;
          outline: none;
        }
      }
    }
  }

  & > .right-pannel {
    width: 450px;
    height: 100%;
    // float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > .right-top {
      flex: 3;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 8;
      }
    }
    & > .right-center {
      flex: 3;
      margin-top: 15px;
      margin-bottom: 15px;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 8;
      }
    }
    & > .right-bottom {
      flex: 4;
      margin-bottom: 15px;
      background: url("../assets/images/yhphb@2x.png") no-repeat center center;
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      background-size: 100% 100%;
      & > p {
        flex: 1;
      }
      & > .content {
        flex: 7;
      }
    }
  }
}
</style>
