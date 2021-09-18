import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import uniqid from "uniqid";

export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      cover: "https://source.unsplash.com/random",
      readTime: { value: 1, unit: "minutes" },
      author: { name: "Ian", avatar: "https://source.unsplash.com/random?1" },
      content: "This is created on frontEnd and saved in backend",
      img: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(val) {
    this.setState({ ...this.state, content: val });
    console.log(val);
  }
  sendPostwithIng = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3003/blogPosts/";
    // FORM DATA
    let formData = new FormData();
    //
    let authorData = JSON.stringify({
      name: this.state.author.name,
      avatar: this.state.author.avatar,
    });
    let readTime = JSON.stringify({
      value: this.state.readTime.value,
      unit: this.state.readTime.unit,
    });
    formData.append("cover", this.state.img);
    formData.append("category", this.state.category);
    formData.append("title", this.state.title);
    formData.append("readTime", readTime);
    formData.append("author", authorData);
    formData.append("content", this.state.content);

    let boundaryId = uniqid();
    // for (let form of formData) {
    //   console.log(form);
    // }

    // SENDING;
    try {
      let response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Context-Type": "multipart/form-data",
          boundary: boundaryId,
        },
      });
      let data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        console.log(formData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // OK
  sendPost = async (e) => {
    const url = "http://localhost:3003/blogPosts/";
    e.preventDefault();
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = response.json();
      if (response.ok) {
        console.log("Successfuly posted!");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={this.sendPostwithIng}>
          <Form.Group controlId="blog-cover" className="mt-3">
            <Form.Label>Cover image</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.cover}
              onChange={(e) =>
                this.setState({ ...this.state, cover: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.title}
              onChange={(e) =>
                this.setState({ ...this.state, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              onChange={(e) =>
                this.setState({ ...this.state, category: e.target.value })
              }
            >
              <option>Some category</option>
              <option>Else one</option>
              <option>Or this one</option>
              <option>guse</option>
              <option>doggo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              onChange={this.handleChange}
              className="new-blog-content"
              value={this.state.content}
              // onChange={(e) =>
              //   this.setState({ ...this.state, content: e.target.value})
              // }
            />
          </Form.Group>
          <h2 className="font-weight-light">Author</h2>
          <Form.Group controlId="blog-author" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Author name"
              value={this.state.author.name}
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  author: { ...this.state.author, name: e.target.value },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Avatar"
              value={this.state.author.avatar}
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  author: { ...this.state.avatar, avatar: e.target.value },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="blog-img"
              className="my-4"
              label="Image"
              onChange={(e) =>
                this.setState({ ...this.state, img: e.target.files[0] })
              }
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
