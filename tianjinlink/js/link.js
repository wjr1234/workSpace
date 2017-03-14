/*
 * title:"链接信息部分的JS"
 * Author:allenzjw
 * Time:3/13
 */
// 点击查询按钮 发起ajax请求向后台请求数据 并显示
// 如果查询内容不存在 则显示空
$('#searchBtn').click(function(){
	$.ajax({
		type:"GET",
		url:"data/ljData.json",
		success:function(LJ){
			// 拿到数据进行拼接展示
			// 实现分页器
			layui.use(['laypage','layer'],function(){
				var laypage = layui.laypage,
					layer = layui.layer;

				var num = 8;//每一页显示8条数据
				//模拟渲染
				var render = function(curr){//当前页
					var html = '',//调用一次render清空一次html 
						j = 0,
						last = curr*num-1;//当前页的最后一行数据的下标

					last = last >= LJ.length?(LJ.length-1):last;
					for(var i = (curr*num-num); i<=last; i++){
						// 从未显示的第一条数据开始
						j = j+1;
						html += '<tr>'+
					                '<td width="6%">'+j+'</td>'+
					                '<td width="12%">'+LJ[i].AJBH+'</td>'+
					                '<td width="10%">'+LJ[i].XM+'</td>'+
					                '<td width="24%">'+LJ[i].SAWZ+'</td>'+
					                '<td width="16%">'+LJ[i].WZMC+'</td>'+
					                '<td width="12%">'+LJ[i].LJLX+'</td>'+
					                '<td width="10%">'+LJ[i].FSSJ+'</td>'+
					                '<td width="20%">'+
					                	'<span class="detailsClick handelClick">详情</span><span class="modifyClick handelClick">修改</span><span class="signClick handelClick">标记</span>'+			
					                '</td>'+
					            '</tr>';
					}
					return html;
				}; 

				laypage({
					cont:'demo4',
					pages:Math.ceil(LJ.length/num),
					first:false,
					last:false,
					jump:function(obj){
						document.getElementById('LJ-list').innerHTML = render(obj.curr);
					}
				});
			});
		}
	});
});
/**
 * 点击自定义表头 弹窗
 */
$('#changeTltle').click(function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['490px','300px'],
		title: '自定义表头',
		content: 'changeTitle.html'
	});
});
/**
 * 点击详情 弹窗 账户信息
 */
$('#ljTable tbody').on('click','.detailsClick',function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['950px','560px'],
		title: '账户信息',
		content: 'accountDetails.html'
	});
});
/**
 * 点击修改 弹窗 修改账户信息
 */
$('#ljTable tbody').on('click','.modifyClick',function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['830px','310px'],
		title: '修改账户信息',
		content: 'modifyDetails.html'
	});
}); 
/**
 * 点击标记 弹窗 标记
 */
$('#ljTable tbody').on('click','.signClick',function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['500px','300px'],
		title: '标记',
		content: 'sign.html'
	});
});