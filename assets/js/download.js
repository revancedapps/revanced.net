var mainUrl = 'https://api.revanced.net';
$(document).ready(function () {
    var url = getQueryStringParam('url');

    if (isNotNullOrEmpty(url)) {
        $('#url').val(url);
        fetchUrl(url);
    }
});

function fillDetail(ytObj) {
    $('#video-thumb').attr('src', ytObj.thumb);
    $('#video-title').text(ytObj.title);

    $('#video-list table tbody').empty();
    $('#audio-list table tbody').empty();

    ytObj.files.forEach(function (item) {
        var element = $('<tr>' +
            '        <td> ' + (isNotNullOrEmpty(item.quality) ? (item.quality) : item.audioSampleRate) + ' </td>' +
            '        <td>' + (isNotNullOrEmpty(item.size) ? (item.size + ' MB') : ' ') + '</td>' +
            '        <td>' + (isNotNullOrEmpty(item.fileExtension) ? (item.fileExtension) : ' ') + '</td>' +
            '        <td className="txt-center">' +
            '            <a className="" target="_blank"  href="'+mainUrl+'/download-video?token='+item.token+'">Download</a>' +
            '        </td>' +
            '    </tr>');
        console.log(item.url);
        if (item.type == "muxed")
            $('#video-list table tbody').append(element);
        else if (item.type == "audio")
            $('#audio-list table tbody').append(element);
    });
}

function fetchUrl(url) {
    $('#loading-bar').removeClass('d-none');
    $('#video-detail').addClass('d-none');

    $.ajax({
        url: mainUrl+'/get-video',
        method: 'GET',
        data: {
            'url': url
        },
        success: function (response) {
            fillDetail(response);
            $('#video-detail').removeClass('d-none');
            $('#loading-bar').addClass('d-none');
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Handle the error
            $('#loading-bar').addClass('d-none');
            console.error(error);
        }
    });
}

function submitForm() {
    var url = $('#url').val();
    if (isNotNullOrEmpty(url)) {
        fetchUrl(url);
    }
    return false;
}

function isNotNullOrEmpty(value) {
    return value !== null && value !== '' && value !== 0;
}

function getQueryStringParam(param) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function getDownloadLink() {

}