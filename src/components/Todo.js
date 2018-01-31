import React, { Component } from 'react';

import { Input, Icon, Button, Card, List} from 'antd';

export class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputText : '',
      listItem: []
    }

    this.handleChangeText = this.handleChangeText.bind(this);

  }

  componentDidMount () {
    // เราควรจะ fetch เพื่อเอาค่ามาจาก MockAPI 
    this.fetchGet();
  }

  async fetchGet () {
    const result = await fetch('http://5a7134edce7c440012e89ec8.mockapi.io/todo')
    let data = await result.json();
    console.log(data)
    let listItem = data.map((value, index) => {
      return value.contents
    });

    this.setState({ listItem })
  }

  deleteListAtIndex = (index) => {
    // ไม่ควรทำเพราะเป็นการ Render ใหม่ทั้ง State ถ้ามีเยอะก็ฉิบหายยย สิครับ
    // this.state.listItem.splice(index, 1);
    // this.setState({});

    const result = this.state.listItem;
    result.splice(index, 1);
    this.setState({listItem: result});
  }

  submitList = () => {
    this.setState({
      listItem: this.state.listItem.concat([this.state.inputText]),
      inputText: ''
    })
    console.log(this.state.listItem);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submitList();
    }
  }

  handleChangeText = (event) => {
    this.setState({inputText: event.target.value});
  }

  render() {

    // const data = [
    //     'text 1',
    //     'text 2',
    //     'text 3',
    // ];

    //const { Header, Footer, Sider, Content } = Layout;
    //const Search = Input.Search;
    //const FormItem = Form.Item;

    return (
        <Card style={{ width: 500 , backgroundColor : this.props.myColor }}>
            <h1>To-do-list</h1>

            <div style={{ marginBottom:'10px'}}>
              <Input
                addonAfter={<Button type="primary" onClick={this.submitList}>Add</Button>}
                onChange={this.handleChangeText}
                value={this.state.inputText}
                onKeyPress={this.handleKeyPress}/>
            </div>

            <List
              bordered
              dataSource={this.state.listItem}
              renderItem={(item,index) => (
                <List.Item actions={[<a onClick={() => this.deleteListAtIndex(index)}><Icon type="close-circle" style={{ fontSize: 16, color: 'rgb(255, 145, 0)' }} /></a>]}>
                    {item}
                </List.Item>
            )}
            />
            {/*
              this.state.listItem.map((value, index) => {
                //console.log(index);
                return (
                  <h3 key={index + value}>{value}</h3>
                );
              })
            */}
        </Card>
      );
    }
}
