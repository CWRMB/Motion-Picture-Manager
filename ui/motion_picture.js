const pic_data={template:`
<div>

<button type="button" class ="btn btn-primary m-2 fload-end" data-bs-toggle="modal"
data-bs-target="#myModal"
@click="addClick()"> Add Motion Picture </button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            <div class="d-flex flex-row">
            <input class="form-control m-2" v-model="PictureIDFilter" v-on:keyup="Filter_func()" placeholder="Filter By ID">
            </div>
            <button type="button" class="btn btn-light" @click="sort_func('PictureID'); toggle()"> Picture ID </button>
        </th>
        <th>
            <div class="d-flex flex-row">
            <input class="form-control m-2" v-model="PictureNameFilter" v-on:keyup="Filter_func()" placeholder="Filter By Name">
            </div>
            <button type="button" class="btn btn-light" @click="sort_func('PictureName'); toggle()"> Picture Name </button>
        </th>
        <th>
            <button type="button" class="btn btn-light" @click="sort_func('PictureDescription'); toggle()"> Picture Description </button>
        </th>
        <th>
            <button type="button" class="btn btn-light" @click="sort_func('PictureRelease'); toggle()"> Picture Release Date </button>
        </th>
        <th>
            Actions
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="pic in motionpictures">
        <td>{{pic.PictureID}}</td>
        <td>{{pic.PictureName}}</td>
        <td>{{pic.PictureDescription}}</td>
        <td>{{pic.PictureRelease}}</td>
        <td>
            <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#myModal" @click="editClick(pic)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" class="btn btn-light mr-1" @click="duplicateClick(pic)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                </svg>
            </button>
            <button type="button" class="btn btn-light mr-1" @click="deleteClick(pic.PictureID)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="myModal" tabindex="-1"
    aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">{{myModalTitle}} </h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 be-highlight">
            <div class="input-group mb-3">
                <span class="input-group-text"> Picture Name </span>
                <input id="name" type="text" class="form-control" v-model="PictureName" placeholder="Picture Name" :maxlength="50"/>
                <div style="padding: 10px 15px; font-size: 15px; font-weight: normal; line-height: 1; color: #2c3e50; text-align: center;
                background-color: #ecf0f1; border: 1px solid #dce4ec; border-radius: 4px;" 
                class="input-group-addon" v-text="(50 - PictureName.length)"></div>
            </div>
                
            <div class="input-group mb-3">
                <span class="input-group-text">Picture Description</span>
                <input id="description" type="text" class="form-control" v-model="PictureDescription" placeholder="Picture Description" :maxlength="500"/>
                <div style="padding: 10px 15px; font-size: 15px; font-weight: normal; line-height: 1; color: #2c3e50; text-align: center;
                background-color: #ecf0f1; border: 1px solid #dce4ec; border-radius: 4px;" 
                class="input-group-addon" v-text="(500 - PictureDescription.length)"></div>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text"> Picture Release Date </span>
                <input id="release" type="text" class="form-control" v-model="PictureRelease" placeholder="Picture Release" :maxlength="4"/>
                <div style="padding: 10px 15px; font-size: 15px; font-weight: normal; line-height: 1; color: #2c3e50; text-align: center;
                background-color: #ecf0f1; border: 1px solid #dce4ec; border-radius: 4px;" 
                class="input-group-addon" v-text="(4 - PictureRelease.toString().length)"></div>
            </div>

        </div>
    </div>
        <button type="button" @click="createClick()" v-if="PictureID==0" class="btn btn-primary"> Create </button>
        <button type="button" @click="updateClick()" v-if="PictureID!=0" class="btn btn-primary"> Update </button>
        <button type="button" @click="reset_style()" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"> Close </button>
    </div>

</div>
</div>
</div>

</div>
`,

data(){
    return{
        motionpictures:[],
        myModalTitle:"",
        PictureName:"",
        PictureDescription:"",
        PictureRelease:"",
        PictureID:0,
        PictureIDFilter:"",
        PictureNameFilter:"",
        PictureDescriptionFilter:"",
        PictureReleaseFilter:"",
        motionpictures_noFilter:[],
        sort_type: false
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL + "MotionPicture").then((response) =>{
            this.motionpictures = response.data;
            this.motionpictures_noFilter = response.data;
        });
    },
    // Form starts update on a new fill out page
    addClick(){
        this.myModalTitle="Add Motion Picture";
        this.PictureID = 0;
        this.PictureName="";
        this.PictureDescription="";
        this.PictureRelease="";
    },
    // start with initial data on edit page
    editClick(pic){
        this.myModalTitle = "Edit Motion Picture";
        this.PictureID = pic.PictureID;
        this.PictureName = pic.PictureName;
        this.PictureDescription = pic.PictureDescription;
        this.PictureRelease = pic.PictureRelease;
    },
    createClick(){
        // Validate Fields
        if(this.PictureName == ""){
            document.getElementById("name").style.borderColor="#FF0000"
            alert("Name field is empty!");
            return;
        }
        if(this.PictureRelease == ""){
            document.getElementById("release").style.borderColor="#FF0000"
            alert("Release data field is empty!");
            return;
        }
        document.getElementById("name").style.borderColor=""
        document.getElementById("release").style.borderColor=""
        //Post to create a new row
        axios.post(variables.API_URL + "MotionPicture",{
            PictureName:this.PictureName,
            PictureDescription: this.PictureDescription,
            PictureRelease: this.PictureRelease
        }).then((response) =>{
            this.refreshData();
            alert(response.data);
        });
    },
    //Update via the edit button and use put to change the row instead of creating a new one
    updateClick(){
        // Validate Fields
        if(this.PictureName == ""){
            document.getElementById("name").style.borderColor="#FF0000"
            alert("Field is empty!");
            return;
        }
        if(this.PictureRelease == ""){
            document.getElementById("release").style.borderColor="#FF0000"
            alert("Field is empty!");
            return;
        }
        document.getElementById("name").style.borderColor=""
        document.getElementById("release").style.borderColor=""
        axios.put(variables.API_URL + "MotionPicture",{
            PictureID: this.PictureID,
            PictureName: this.PictureName,
            PictureDescription: this.PictureDescription,
            PictureRelease: this.PictureRelease
        }).then((response) =>{
            this.refreshData();
            alert(response.data);
        });
    },
    // Duplicate and post the row pressed
    duplicateClick(pic){
        axios.post(variables.API_URL + "MotionPicture",{
            PictureName: pic.PictureName,
            PictureDescription: pic.PictureDescription,
            PictureRelease: pic.PictureRelease
        }).then((response) =>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure you want to delete?")){
            return;
        }
        axios.delete(variables.API_URL + "MotionPicture/" + id).then((response) =>{
            this.refreshData();
        });
    },
    // Filter by id or name
    Filter_func(){
        var PictureIDFilter = this.PictureIDFilter;
        var PictureNameFilter = this.PictureNameFilter;

        this.motionpictures = this.motionpictures_noFilter.filter(
            function(el){
                return el.PictureID.toString().toLowerCase().includes(
                    PictureIDFilter.toString().trim().toLowerCase()
                ) &&
                el.PictureName.toString().toLowerCase().includes(
                    PictureNameFilter.toString().trim().toLowerCase()
                )
            }
        );
    },
    // Sort by ascending or descending via a single button press on the header
    sort_func(type){
        var sort_type = this.sort_type;
        this.motionpictures = this.motionpictures_noFilter.sort(function(a, b){
            if(sort_type){
                return (a[type] > b[type]) ? 1:((a[type] < b[type]) ?-1:0);
            }
            return (b[type] > a[type]) ? 1:((b[type] < a[type]) ? -1:0);
        })
    },
    toggle(){
        this.sort_type = this.sort_type ? false : true;
    },
    reset_style(){
        document.getElementById("name").style.borderColor=""
        document.getElementById("release").style.borderColor=""
    }
},
mounted:function(){
    this.refreshData();
}

}