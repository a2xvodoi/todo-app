var list;
class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            _id: this.props._id,
            ten: this.props.name,
        };
        this.deleteTodo = this.deleteTodo.bind(this);
        this.showFieldEdit = this.showFieldEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.edit = this.edit.bind(this);
        this.changeValueInputEdit = this.changeValueInputEdit.bind(this);
    }
    render(){
        if (this.state.status) {
            return(
                <div>
                    <div className="alert alert-secondary" role="alert">
                        <div className="row">
                            <div className="col-7">
                                <input type="text" className="form-control" defaultValue={this.props.name} name= "ten" onChange = {this.changeValueInputEdit}/>
                            </div>
                            <div className= "col-5 text-center">
                                <button className="btn btn-success" onClick={this.edit}>Sửa</button>
                                <button className="btn btn-danger" onClick={this.cancelEdit}>Hủy</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="alert alert-secondary" role="alert">
                        {this.props.name}
                        <div className= "more">
                            <button className="btn btn-success" onClick={this.showFieldEdit}>Sửa</button>
                            <button className="btn btn-danger" onClick={this.deleteTodo}>Xóa</button>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
    showFieldEdit(){
        this.state.status = true;
        this.setState(this.state);
    }
    cancelEdit(){
        this.state.status = false;
        this.setState(this.state);
    }
    changeValueInputEdit(e){
        this.state.ten = e.target.value;
        this.setState(this.state);
    }
    edit(){
        var that = this;
        $.ajax({
            type: "PUT",
            url: "/api/todo/edit",
            data: {
                _id: this.props._id,
                ten: this.state.ten,
            },
            dataType: "JSON",
            success: function (response) {
                if (!response.status) {
                    alert('Sửa thất bại!');
                    return;
                }
                that.cancelEdit();
                list.setState({listTodo: list.state.listTodo.map((todo) =>{
                    if (todo._id == that.props._id) {
                        todo.ten = that.state.ten;
                        return todo;
                    }
                    return todo;
                })});
            }
        });
    }
    deleteTodo(){
        var that = this;
        $.ajax({
            type: "DELETE",
            url: "/api/todo/delete",
            data: {_id: this.props._id},
            dataType: "JSON",
            success: function (response) {
                if (!response.status) {
                    alert('Xóa thất bại!');
                    return;
                }
                list.setState({listTodo: list.state.listTodo.filter(item => item._id !== that.props._id)});
            }
        });
    }
};
class InputAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            ten: '',
        };
        this.changeValueInputAdd = this.changeValueInputAdd.bind(this);
        this.add = this.add.bind(this);
    }
    render(){
        return(
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="To do ..." name= "ten" onChange = {this.changeValueInputAdd}/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.add}>Thêm</button>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick= {this.cancelAdd}>Hủy</button>
            </div>
        )
    }
    changeValueInputAdd(e){
        const data = {
            status: true,
            ten: e.target.value,
        };
        this.setState(data);
    }
    add(){
        var addTen = this.state.ten
        $.post('/api/todo/create',{ten: addTen}, (data) =>{
            if (!data.status) {
                alert("Thêm todo thất bại!");
                return;
            }
            $.get('/api/todo',(data) =>{
                list.setState(data);
            });
            ReactDOM.unmountComponentAtNode(document.getElementById('add-todo'));
        })
    }
    cancelAdd(){
        ReactDOM.unmountComponentAtNode(document.getElementById('add-todo'));
    }
};
class Sort extends React.Component{
    constructor(props) {
        super(props);
        this.state = {status: this.props.status};
        this.sort = this.sort.bind(this);
    }
    render(){
        if (this.state.status === "-1") {
            return(
                <button className="btn" onClick={this.sort}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                </button>
            )
        } else {
            return(
                <button className="btn" onClick={this.sort}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16">
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                </button>
            )
        }
    }
    compare(a,b){
        if ( a.ten < b.ten ){
            return -1;
          }
          if ( a.ten > b.ten ){
            return 1;
          }
          return 0;
    }
    sort(){
        if (this.state.status === "-1") {
            list.setState({listTodo: list.state.listTodo.sort(this.compare).reverse()});
            this.setState({status: "1"});
        } else {
            list.setState({listTodo: list.state.listTodo.sort(this.compare)});
            this.setState({status: "-1"});
        }
    }
};
class ListTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listTodo: []}; 
        list = this;
    }
    
    render() {
      return(
          <div className="list-to-do">
            <h1 className= "text-black-50 text-center position-relative title-todo">
                Danh sách Todo
                <button onClick={this.showFieldAdd} className="btn position-absolute top-1 start-100 translate-middle badge rounded-pill bg-success">
                    Thêm
                </button>
            </h1>
            <Sort status= "-1"/>
            <div id="add-todo"></div>
            <div>
                  {
                      list.state.listTodo.map((todo, index) =>{
                        return <Todo name = {todo.ten} _id= {todo._id} key = {index}/>
                      })
                    // console.log(this.state.listTodo[0])
                  }
              </div>
              
          </div>
      )
    }
    componentDidMount(){
        $.get('/api/todo',(data) =>{
            this.setState(data);
        });
    }
    showFieldAdd(){
        ReactDOM.render(
            <InputAdd />,
            document.getElementById('add-todo')
        )
        
    }
};
ReactDOM.render(
    <ListTodo/> 
    ,document.getElementById('root')
);
