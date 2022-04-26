<template>
	<el-container class="home-container">
		<!--页面主体区域-->
		<el-container>
			<!--侧边栏-->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<!--侧边栏菜单区域-->
				<div class="toggle-button" @click="toggleCollapse">|||</div>
				<el-menu background-color="#191a23" text-color="#fff" 
					active-text-color="#80b168" :collapse="isCollapse" 
					:collapse-transition="false" :router="true" :unique-opened="true"
					:default-active="activePath">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-order"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/Transaction" @click="saveNavState('/Transaction')">交易订单</el-menu-item>
							<el-menu-item index="/Inquiry" @click="saveNavState('/Inquiry')">询比价</el-menu-item>
							<el-menu-item index="/Bidding" @click="saveNavState('/Bidding')">竞价列表</el-menu-item>
							<el-menu-item index="/AfterSaleList" @click="saveNavState('/AfterSaleList')">售后列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2" >
						<template slot="title">
							<i class="el-icon-s-management"></i>
							<span>合同管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/Template" @click="saveNavState('/Template')">平台合同模板</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3" >
						<template slot="title">
							<i class="el-icon-s-marketing"></i>
							<span>统计报表</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/Sale" @click="saveNavState('/Sale')">销售统计</el-menu-item>
							<el-menu-item index="/Visit" @click="saveNavState('/Visit')">访问统计</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4" >
						<template slot="title">
							<i class="el-icon-s-shop"></i>
							<span>店铺管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/StoreAudit" @click="saveNavState('/StoreAudit')">店铺列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="5" >
						<template slot="title">
							<i class="el-icon-edit"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/Users" @click="saveNavState('/Users')">用户列表</el-menu-item>
							<el-menu-item index="/Enterprise" @click="saveNavState('/Enterprise')">企业认证记录</el-menu-item>
							<el-menu-item index="/Person" @click="saveNavState('/Person')">个人认证记录</el-menu-item>
							<el-menu-item index="/UserRouter" @click="saveNavState('/UserRouter')">用户路由</el-menu-item>
							<el-menu-item index="/UserApi" @click="saveNavState('/UserApi')">用户API</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="6" >
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/CommodityExam" @click="saveNavState('/CommodityExam')">商品审核</el-menu-item>
							<el-menu-item index="/CommodityList" @click="saveNavState('/CommodityList')">商品列表</el-menu-item>
							<el-menu-item index="/Kind" @click="saveNavState('/Kind')">分类管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="7" >
						<template slot="title">
							<i class="el-icon-s-data"></i>
							<span>系统管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/Administrator" @click="saveNavState('/Administrator')">管理员</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!--右侧内容主体-->
			<el-main>
				<!--<div class="container"></div>-->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>

	export default{
		data(){
			return{
				isCollapse: false,
				activePath:''
			}
		},
		created(){
			this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods:{
//			点击按钮,切换菜单的折叠与展开
			toggleCollapse(){
				this.isCollapse = ! this.isCollapse
			},
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath',activePath)
				this.activePath = activePath
			}
		}
	};
</script>

<style >
	*{
		padding: 0;
		margin: 0;
	}

	.home-container {
		height: 100%;
	}
	

	.el-aside{
		background-color: #191a23;
		overflow: hidden!important;
		border-radius: 10px;
		box-shadow: 12px 0px 10px -4px rgba(0, 0, 0, .3);
	}
	.toggle-button{
		background-color: #434346;
		font-size: 10px;
		line-height: 24px;
		color: #FFFFFF;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
		overflow-x: hidden;
	}
	.el-menu{
		width: 100%;
	}
</style>