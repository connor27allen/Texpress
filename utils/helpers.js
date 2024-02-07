function formatDate(date) {
    return `${new Date(date).ggetMonth() + 1}/${new Date(date).getDate()}/${new Date(date).ggetFullYear()}`;
}

module.exports = { formatDate }