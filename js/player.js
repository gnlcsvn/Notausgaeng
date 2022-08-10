// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.18/plyr.js

// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'songs/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Mein Computer - Notausgäng",
                "duration": "1:52",
                "file": "meincomputer"
            }, {
                "track": 2,
                "name": "Hermine - Notausgäng",
                "duration": "2:58",
                "file": "hermine"
            }, {
                "track": 3,
                "name": "Ich hab kein Internet - Notausgäng",
                "duration": "1:56",
                "file": "ichhabkeininternet"
            }, {
                "track": 4,
                "name": "High School Pop Punk - Notausgäng",
                "duration": "3:11",
                "file": "highschoolpoppunk"
            }, {
                "track": 5,
                "name": "Jugendliebe - Notausgäng",
                "duration": "2:14",
                "file": "jugendliebe"
            }, {
                "track": 6,
                "name": "Mach 2 - Notausgäng",
                "duration": "2:11",
                "file": "mach2"
            }, {
                "track": 7,
                "name": "Zerkratzt - Notausgäng",
                "duration": "3:06",
                "file": "zerkratzt"
            }, {
                "track": 8,
                "name": "Goldenes Haar - Notausgäng",
                "duration": "2:42",
                "file": "goldeneshaar"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                $('.vinyl').addClass('rotate');
                $('.vinyl').removeClass('pause');
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                $('.vinyl').addClass('pause');
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

// initialize plyr
plyr.setup($('#audio1'), {});
