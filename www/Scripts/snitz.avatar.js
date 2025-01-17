﻿// ================================================================
//  Description: Avatar Upload supporting script
//  License:     MIT - check License.md file for details
//  Author:      MiroJ (https://github.com/MiroJ)
// ================================================================
var jcrop_api,
    boundx,
    boundy,
    xsize,
    ysize;

// TODO: - change the size limit of the file. You may need to change web.config if larger files are necessary.
var maxSizeAllowed = window.SnitzVars.MaxFileSize;     // Upload limit in MB
var maxSizeInBytes = maxSizeAllowed * 1024 * 1024;
var keepUploadBox = false;  // TODO: - Remove if you want to keep the upload box
var keepCropBox = false;    // TODO: - Remove if you want to keep the crop box


function initAvatarUpload() {
    $('#avatar-upload-form').ajaxForm({
        beforeSend: function () {
            updateProgress(0);
            $('#avatar-upload-form').addClass('hidden');
        },
        uploadProgress: function (event, position, total, percentComplete) {
            updateProgress(percentComplete);
        },
        success: function (data) {
            updateProgress(100);
            if (data.success === false) {
                $('#status').html(data.errorMessage);
            } else {
                $('#preview-pane .preview-container img').attr('src', data.fileName);
                var img = $('#crop-avatar-target');
                img.attr('src', data.fileName);

                if (!keepUploadBox) {
                    $('#avatar-upload-box').addClass('hidden');
                }
                $('#avatar-crop-box').removeClass('hidden');
                initAvatarCrop(img);
                
            }
        },
        complete: function (xhr) {
        }
    });
}

function updateProgress(percentComplete) {
    $('.upload-percent-bar').width(percentComplete + '%');
    $('.upload-percent-value').html(percentComplete + '%');
    if (percentComplete === 0) {
        $('#upload-status').empty();
        $('.upload-progress').removeClass('hidden');
    }
}

function initAvatarCrop(img) {
    img.Jcrop({
        onChange: updatePreviewPane,
        onSelect: updatePreviewPane,
        aspectRatio: xsize / ysize,
        boxWidth: 350, //Maximum width you want for your bigger images
        boxHeight: 600 //Maximum Height for your bigger images
    }, function () {
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];

        jcrop_api = this;
        jcrop_api.setOptions({ allowSelect: true });
        jcrop_api.setOptions({ allowMove: true });
        jcrop_api.setOptions({ allowResize: true });
        jcrop_api.setOptions({ aspectRatio: 1 });

        // Maximise initial selection around the centre of the image,
        // but leave enough space so that the boundaries are easily identified.
        var padding = 20;
        var shortEdge = (boundx < boundy ? boundx : boundy) - padding;
        var longEdge = boundx < boundy ? boundy : boundx;
        var xCoord = longEdge / 2 - shortEdge / 2;
        jcrop_api.animateTo([xCoord, padding, shortEdge, shortEdge]);

        var pcnt = $('#preview-pane .preview-container');
        xsize = pcnt.width();
        ysize = pcnt.height();
        $('#preview-pane').appendTo(jcrop_api.ui.holder);
        jcrop_api.focus();
    });
}

function updatePreviewPane(c) {
    if (parseInt(c.w) > 0) {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $('#preview-pane .preview-container img').css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
    }
}

function saveAvatar() {
    var img = $('#preview-pane .preview-container img');
    $('#avatar-crop-box button').addClass('disabled');

    $.ajax({
        type: "POST",
        url: window.SnitzVars.baseUrl + "Avatar/Save",
        traditional: true,
        data: {
            w: img.css('width'),
            h: img.css('height'),
            l: img.css('marginLeft'),
            t: img.css('marginTop'),
            fileName: img.attr('src')
        }
    }).done(function (data) {
        if (data.success === true) {
            //$('.avatar').attr('src', '');
            $("#modal-container").modal('hide');
            //$('.avatar').attr('src', data.avatarFileLocation);
            setTimeout(function () {

            window.location.reload();
                
            }, 500);
            
        } else {
            alert(data.errorMessage);
        }
    }).fail(function (e) {
        alert('Cannot upload avatar at this time');
    });
}