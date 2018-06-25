define(['mithril','titar','controllers/Project','controllers/Task','controllers/Employee','models/Project','models/Task', 'models/Employee'], function(n,t,ProjectController,TaskController,EmployeeController,Project, Task,Employee){

    var ProjectModalNewTaskView = {
        oninit: function(vnode){
					Task.current.statusId = 1;
        },
				oncreate:function(vnode){
					//TaskController.render.test(vnode);
				},
        view : function(){
            return[
                m("div.uk-modal-dialog uk-modal-body",[
									m("button.uk-modal-close-outside",{"uk-close":""}),
									m("div.uk-form-stacked",{"uk-margin":""},[
										m("h4","Редактировать задачу"),
										m("div.uk-margin",[
											m("label.uk-form-label","Название"),
											m("input.uk-input",{placeholder:"Название", value:Task.current.name ,oninput: m.withAttr("value",function(value){Task.current.name = value;})})
										]),
										m("div.uk-margin",[
											m("label.uk-form-label","Назначить задачу"),
											m("div.uk-button-group",[
												m("input.uk-input",{placeholder:"Название", oninput: m.withAttr("value",function(value){
													if(value.length >= 3){
														EmployeeController.search(value);
														UIkit.dropdown(t.getById("new-member-dropdown")).show();
													}else{
														Employee.searchList = [];
														UIkit.dropdown(t.getById("new-member-dropdown")).hide();
													}
											})}),
												m("div#new-member-dropdown",{"uk-dropdown":"mode:none"},[
													m("ul.uk-nav uk-iconnav uk-dropdown-nav uk-padding-remove-left",[
														Employee.searchList.map(function(item){
															return m("li",[

																m("a",{onclick:function(){TaskController.addMember(item);}},item.firstname + " " + item.lastname)
															])
														})
													])
												]),
											]),
											m('ul.uk-list',[
												Object.keys(Task.current.memberList).map((id) => {
													return m("li.uk-flex uk-flex-middle", [
														m("div.uk-margin-small-right",{style:"width:25px;height:25px; background:black; border-radius:100%; background-image:url("+Task.current.memberList[id].photo+"); background-size:cover"}),
														m("span",Task.current.memberList[id].firstname + " " + Task.current.memberList[id].lastname),
														m("span.uk-link",{"uk-icon":"icon:close", onclick:() => {TaskController.removeMember(id)}})
													])
												})
											])
										]),
										m("div.uk-margin",[
											m("label.uk-form-label","Статус"),
											m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.statusId = value;})},[
												m("option",{value:"1",selected:true},"Новая"),
												m("option",{value:"2"},"В процессе"),
												m("option",{value:"3"},"Тестирование"),
												m("option",{value:"4"},"Готово"),
											]),
										]),
										// m("div",[
										// 	m("label.uk-form-label","Приоритет"),
										// 	m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.priority = value;})},[
										// 		m("option","Высокий"),
										// 		m("option",{selected:true},"Нормальный"),
										// 		m("option","Низкий"),
										// 	])
										// ]),
										m("div.uk-margin",[
											m("button.uk-button uk-button-primary uk-modal-close",{onclick:function(){TaskController.add()}},"Добавить")
										]),
									])
								])
            ]

        },
    }
    return ProjectModalNewTaskView;

});
