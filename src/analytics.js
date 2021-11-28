import * as $ from 'jquery';


function createAnalytics(){
    let clickCount = 0;
    $(document).on('click', () => {
        ++clickCount;
    });

    return {
        getClicks(){
            return clickCount;
        }
    };
}

import('lodash').then(result => {
    console.log(result.default.isEqual({name: "sun"}, {name: "sun"}))
});

window.analytics = createAnalytics;