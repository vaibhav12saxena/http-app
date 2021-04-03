import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    /*******  OLDER WAY OF WRITING PROMISES
    * const promise = http.get("https://jsonplaceholder.typicode.com/posts");
    //Promise is an object that holds the result of an asynchronous operation. Promises to hold the result of the http call here
    promise
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(promise);
    */
    const { data } = await http.get(
      // object destructuring
      config.apiEndPoint
    );
    console.log(data);
    this.setState({ posts: data });
  }
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data } = await http.post(config.apiEndPoint, obj);

    const posts = [data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    await http.put(`${config.apiEndPoint}/${post.id}`, post); // patch we send only the property to be chnaged
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalposts = [...this.state.posts];
    const posts = this.state.posts.filter((e) => e.id !== post.id); // always forget the return or {} does not return
    this.setState({ posts });
    try {
      await http.delete(`${config.apiEndPoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.staus) {
        alert("post already deleted", ex);
      }

      this.setState({ posts: originalposts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
