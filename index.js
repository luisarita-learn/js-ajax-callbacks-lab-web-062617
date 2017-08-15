$(document).ready(function (){

});

function searchRepositories(){    
    let searchTerms = window.$('#searchTerms').val()
    let url = `https://api.github.com/search/repositories?q=${searchTerms}`
    $.get(url).done(function(response) {
        // Here we are getting the element on the page with the id of sentences and
        // inserting the response
        let htmlResults = response.items.map( r => formatResult(r))
        $("#results").html(`<ul>${htmlResults}</ul>`)
    });
}

function formatResult(result){
    return `<li>
        <a href="${result.owner.html_url}"><img src="${result.owner.avatar_url}" /></a>
        <a href="${result.html_url}">${result.full_name}</a> by <a href="${result.owner.html_url}">${result.owner.login}</a>
        <br>${result.description}</li>
        <a href="#" data-owner="${result.owner.login}" data-repository="${result.name}" onclick=showCommits(this)>Show Commits</a></li>`
}

function formatCommit(result){
    return `<div><a href='${result.html_url}'></a>${result.author.login} - ${result.commit.author.name}</div>`
}

function showCommits(el){
    let url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
    $.get(url).done(function(response) {
        // Here we are getting the element on the page with the id of sentences and
        // inserting the response
        let htmlResults = response.map( r => formatCommit(r))
        $("#details").html(htmlResults)
    }).fail(function(response) {
        // Here we are getting the element on the page with the id of sentences and
        // inserting the response
        //let htmlResults = response.map( r => formatCommit(r))
        displayError()
    });
}

function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
