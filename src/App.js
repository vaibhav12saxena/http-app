import React, { Component } from "react";
import axios from "axios";
import "./App.css";

axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.staus >= 400 &&
    error.response.staus <= 500
  ) {
    return Promise.reject(error);
  } else {
    alert("Unexpected error");
    return Promise.reject(error);
  }
});

const urlEmbedded = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    /*******  OLDER WAY OF WRITING PROMISES
    * const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
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
    const { data } = await axios.get(
      // object destructuring
      urlEmbedded
    );
    console.log(data);
    this.setState({ posts: data });
  }
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data } = await axios.post(urlEmbedded, obj);

    const posts = [data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    await axios.put(`${urlEmbedded}/${post.id}`, post); // patch we send only the property to be chnaged
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
      await axios.delete(`${urlEmbedded}/${post.id}`);
      throw new Error("");
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
