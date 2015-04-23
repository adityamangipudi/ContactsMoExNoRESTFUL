document.addEventListener('DOMContentLoaded', function () {

    var ContactService = {
        get: function (email) {
            // gets all the contacts
           // console.log(email)
            callback=function(xhr){
                if(xhr.readyState===4){
                   var response = JSON.parse(xhr.responseText)

                    //console.log(response)
                    render(response)
                }
                // console.log(xhr.readyState)
            }
            makeAjaxCall( '/contacts?email='+email, 'GET', {}, callback)


        },
        create: function (obj) {



            callback = function(xhr){
                if(xhr.status === 200){
                    var response = JSON.parse(xhr.responseText);
                    render(response);
                }
            }
            var retid = makeAjaxCall( '/contacts', 'POST', obj, callback)
        },
        getAll: function () {
           // console.log('here out')
            callback=function(xhr){
                if(xhr.readyState===4){
                    console.log(JSON.parse(xhr.responseText))
                }


            }
            makeAjaxCall( '/contacts', 'GET',{}, callback)
        },
        update: function (id, obj) {

            callback=function(xhr){
                if(xhr.readyState===4){
                    var response =JSON.parse(xhr.responseText)
                    if(response.nModified===1){
                        console.log('modified')
                    }
                   // console.log('res',response)
                    //render(response)
                }
                // console.log(xhr.readyState)
            }
           // console.log('obj', obj)
            makeAjaxCall( '/contacts?_id='+id, 'PUT', obj, callback)


        },
        delete: function (id) {
            callback=function(xhr){
                if(xhr.readyState===4){
                    var response =JSON.parse(xhr.responseText)

                    // console.log('delete ress', response)
                    if(response.ok===1 && response.n===1){
                        document.querySelector('div.name').innerHTML = ''
                        document.querySelector('div.email').innerHTML = ''
                        deleteBut.dataset.uId = '';
                        edit.dataset.uId = '';
                    }

                    //render(response)
                }
                // console.log(xhr.readyState)
            }
            makeAjaxCall( '/contacts?_id='+id, 'DELETE', {}, callback)

        }
    };

    function makeAjaxCall(url, httpVerb, obj, callback) { // obj is optional depending on the request
        var xhr = new XMLHttpRequest();
        xhr.open(httpVerb, url);
        // if the httpVerb is post, modify the request header - content-type, xhr.send(JSON.stringify(obj))
        if(httpVerb === 'POST'){
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    callback(xhr);
                }
            });
            xhr.send(JSON.stringify(obj));

        }
        if(httpVerb === 'GET'||httpVerb==='DELETE'){

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    callback(xhr);
                }
            });
            xhr.send()
        }
        if(httpVerb === 'PUT'){
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    callback(xhr);
                }
            });
            xhr.send(JSON.stringify(obj));

        }



    }

    var form = document.forms.candidate;
    form.addEventListener('submit', function(event){
        event.preventDefault();

        ContactService.create({
            name: form.name.value,
            email: form.email.value
        })

    })

    var edit = document.querySelector('button.edit')
    var deleteBut = document.querySelector('button.delete')
    var getone = document.querySelector('input.submitGet')
    var getall = document.querySelector('button.submitGetAll')
    edit.addEventListener('click', function(event){
        if(edit.dataset.uId!==''){
            ContactService.update(edit.dataset.uId,
                {name : document.querySelector('div.name').innerHTML,
                 email: document.querySelector('div.email').innerHTML})
        }
    })
    deleteBut.addEventListener('click', function(event){
        if(deleteBut.dataset.uId!==''){
            ContactService.delete(edit.dataset.uId)


        }
    })


    getall.addEventListener('click', function(event){
        event.preventDefault()
           // ContactService.put()

        ContactService.getAll()
    })
    getone.addEventListener('click', function(event){
        event.preventDefault();
           // ContactService.put()

        ContactService.get(document.forms.email.email.value)
    })


    function render(obj) {
       if(Object.prototype.toString.call( obj ) === '[object Array]'){
           obj = obj.pop()
       }
        if(typeof obj !=='undefined'){
            var pname = document.querySelector('div.name');
            var pemail = document.querySelector('div.email');

            pname.innerHTML = obj.name;
            pemail.innerHTML = obj.email;
            deleteBut.dataset.uId = obj._id;
            edit.dataset.uId = obj._id;
        }



    }
    /**
     * Created by adityamangipudi1 on 4/22/15.
     */

});

