/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    storyModel: null,
    didReceiveAttrs: function () {
        this.loadFeed('http://news.leeds.gov.uk/feed/en');            
    },


    didInsertElement: function () {
        this.set('title', 'Leeds Gov News');
        this.set('subTitle', 'New from Leeds');
    },

    loadFeed: function (feedUrl) {
        var obj = this;
        var base64FeedUrl = hebeutils.Base64.encode(feedUrl);
        var url = 'http://hebenodeapi.azurewebsites.net/apiproxy?url=' + base64FeedUrl + '&toJSON=true';
        this.getData(url)
            .then(
                function (data) {
                    // success
                    console.log('rss-leeds-gov > getData > success');
                    // data is the response Object/Array from the AJAX request
                    var items = [];
                    data.rss.channel[0].item.forEach((tmpItem) => {
                        var image = '';
                        
                        try {
                            image = tmpItem.enclosure[0].$.url;
                        } catch (err) {

                        }
                        
                        var item = {
                            id: tmpItem.guid,
                            title: tmpItem.title,
                            description: tmpItem.description,
                            image: image,
                            link: tmpItem.link,
                            pubDate: tmpItem.pubDate
                        };

                        items.push(item);
                    });
                    obj.set('items', items);
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function (error) {
                    // failure
                    console.log('rss-leeds-gov > getData > error: ' + error);
                },
                function () {
                    // complete
                }
                )
    }
});
