define(['mithril','titar','models/Client','models/Notification','libs/cropper'], function(n,t,Client,Notification,Cropper){

    var ClientController = {
        init:{
            default:function(){
								ClientController.clearCurrent();
                ClientController.load.list();
            },
						new:function(){
							ClientController.init.default();
							ClientController.load.nextId();

						},
						current:function(id){
							ClientController.init.default();
							ClientController.load.current(id);
							Client.list.forEach(function(item){
								if(item.id == id){
									Client.current = item;
								}
							})
						}
        },
        load:{
            list:function(){
                m.request({
                    method: "GET",
                    url:"../api/client/list",
                    withCredentials:true,
                }).then(function(report){
					Client.list = report;
                    // if(report.code == 200){
                    //     Client.list = report.result;
					// 							if(Client.list != null){
					// 								Client.list.forEach(function(client){
					// 									if(client.contacts != null && client.contacts != ""){
					// 										client.contacts = JSON.parse(client.contacts);
					// 									}
					//
					// 								});
					// 							}
					//
                    // }else{
					//
                    // }
                });
            },
						current:function(id){
							m.request({
									method: "GET",
									url:"../api/client/"+id,
									withCredentials:true,
							}).then(function(report){
								Client.current = report;
									// if(report.code == 200){
									// 		Client.current = report.result
									// 		if(Client.current.contacts != null && Client.current.contacts != ""){
									// 			Client.current.contacts = JSON.parse(Client.current.contacts);
									// 		}
									//
									// }else{
									//
									// }
							});
						},
						nextId:function(){
							m.request({
									method: "GET",
									url:"../api/client/next/id",
									withCredentials:true,
							}).then(function(report){

								Client.current.id = report.result;

							});
						}
        },
				add:function(){
					let client = Client.current;
					m.request({
							method: "POST",
							url:"../api/client/add",
							data:Client.current,
							withCredentials:true,
					}).then(function(report){
						m.route.set("client/list");
						UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
					});
				},
				save:function(){
					if(Client.current != null){
						m.request({
								method: "POST",
								url:"../api/client/"+Client.current.id+"/save",
								data:Client.current,
								withCredentials:true,
						}).then(function(report){
							m.route.set("/client/view/"+Client.current.id);
							UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
						});
					}

				},
				remove:function(id){
					if(id != null){
						m.request({
								method: "DELETE",
								url:"../api/client/"+id+"/remove",
								withCredentials:true,
						}).then(function(report){
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
						});
					}

				},
				addContact:function(name){
					let contact = {
						name:name,
						value:""
					};
					Client.current.contacts.push(contact);
				},
				addComment:function(){
					m.request({
							method: "POST",
							url:"../api/client/"+Client.current.id+"/comment/add",
							data:{text:Client.current.commentNew, userId:t.userId},
							withCredentials:true,
					}).then(function(report){
								Client.current.commentList[report.result.id] = report.result;
								Client.current.commentNew = '';
					});
				},
				removeComment:function(id){
					m.request({
							method: "DELETE",
							url:"../api/client/"+Client.current.id+"/comment/"+id+"/remove",
							withCredentials:true,
					}).then(function(report){

								delete Client.current.commentList[id];

					});
				},
				clearCurrent:function(){
					Object.keys(Client.current).forEach(function(item){
						Client.current[item] = null;
					});
					Client.current.status = "Новый клиент";
					Client.current.lastContact = t.getDate();
				},
				setThumbnail:(e, id)=>{
					let file = e.target.files[0];
					Client.current.file = file;
					let img = t.getById(id);
					let reader = new FileReader();
				    reader.onload = (function(aImg) {
						return function(e) {
							//aImg.style = "background-position:center; background-size:cover;width:256px; height:256px;background-image:url("+e.target.result+")";
							Client.current.photo = e.target.result;
							var cropper = new Cropper(img, {
					  		  viewMode: 2,
					  		  aspectRatio: 1/1,
					            ready: function () {
					              var clone = this.cloneNode();
					              clone.className = ''
					              clone.style.cssText = (
					                'display: block;' +
					                'width: 100%;' +
					                'min-width: 0;' +
					                'min-height: 0;' +
					                'max-width: none;' +
					                'max-height: none;'
					              );
					            },
					            crop: function (e) {
					              var data = e.detail;
					              var cropper = this.cropper;
					              var imageData = cropper.getImageData();
					              var previewAspectRatio = 1 / 1;
					            }
					          });
						};
					})(img);
				    reader.readAsDataURL(file);
				}
    }

    return ClientController;
});
