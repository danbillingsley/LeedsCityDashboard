/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function () {
        this.set('title', 'Statutory notices');
        this.set('subTitle', 'Current Notices');
        var obj = this;
//                obj.set('newlyAddedCount', 4);

        // this.getData('http://statnotices.azurewebsites.net/api/statnotices?count=true&lastmonth=true')
        this.getData('http://statnotices-preview.azurewebsites.net/api/statnotices?count=true')
            .then(function (count) {
                // Todo: how to define new?
                    // start date - so search for items newer then startDate
                obj.set('newlyAddedCount', count);
                setTimeout(() => {
                    obj.set('loaded', true);
                });
            },function(err){
                console.log('Error getting stat notice count: ' + err);
            });
    }
});
