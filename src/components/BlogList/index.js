import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {
    convertedBlogData: [],
    isLoaded: true,
  }
  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const fetchedData = await response.json()

    const newData = fetchedData.map(eachData => ({
      id: eachData.id,
      title: eachData.title,
      imageUrl: eachData.image_url,
      avatarUrl: eachData.avatar_url,
      author: eachData.author,
      topic: eachData.topic,
    }))
    this.setState({convertedBlogData: newData, isLoaded: false})
  }
  render() {
    const {convertedBlogData, isLoaded} = this.state

    return (
      <div className="blog-list-container">
        {isLoaded ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="">
            {convertedBlogData.map(eachItem => (
              <BlogItem key={eachItem.id} blogItemDetails={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
