var _ = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    const cal = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(cal, 0)
}

const favoriteBlog = (blogs) => {
    if (_.size(blogs) === 0) {
        return null
    } else {
        const orderBlogs = _.orderBy(blogs, ['likes'], ['desc'])
        return { author: orderBlogs[0].author,  title: orderBlogs[0].title, likes: orderBlogs[0].likes }
    }
}

const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author')

    const mostPublishedAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author])

    if (_.size(blogs) === 0) {
        return null
    } else {
        return { author: mostPublishedAuthor, blogs: authorCounts[mostPublishedAuthor] }
    }
}

const mostLikes = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author')
    const likesByAuthor = _.mapValues(groupedByAuthor, authorBlogs =>
        _.sumBy(authorBlogs, 'likes')
    )
    const mostLikedAuthor = _.maxBy(_.keys(likesByAuthor), author => likesByAuthor[author])
    if (_.size(blogs) === 0) {
        return null
    } else {
        return { author: mostLikedAuthor, likes: likesByAuthor[mostLikedAuthor] }
    }
}

module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes,
    favoriteBlog
}