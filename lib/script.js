


var service = {};

        service.bindVideoPlayer = function (elementId) {
            service.playerId = elementId;
            service.loadPlayer();
        };
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        service.ready = false;
        service.playerId = "ytplayer";
        service.player = null;
        service.plvayerHeight = '400';
        service.playerWidth = '600';

        window.onYouTubeIframeAPIReady = function () {
            service.ready = true;
            service.loadPlayer();
        }


        service.createPlayer = function () {
            return new YT.Player(this.playerId, {
                height: this.playerHeight,
                width: this.playerWidth,
                videoId: this.videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        service.getDuration = function () {

            console.log("duration", this.player.getDuration());
            return this.player.getDuration();
        }

        service.getCurrentTime = function () {
            console.log("currentTime", this.player.getCurrentTime());
            return Math.ceil(this.player.getCurrentTime());
        }



        service.loadPlayer = function () {
            // API ready?
            if (this.ready && this.playerId && this.videoId) {
                if (this.player) {
                    this.player.destroy();
                }
                this.player = this.createPlayer();
                console.log(this.player);
            }
        };

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;

        function onPlayerStateChange(event) {
            console.log("event", event.data)
            if (event.data == YT.PlayerState.PLAYING && !done) {
                // setTimeout(stopVideo, 6000);
                done = true;
            }
        }

        function stopVideo() {
            service.player.stopVideo();
        }




service.videoId = "EZVPRe5jRs4";
service.bindVideoPlayer('player');