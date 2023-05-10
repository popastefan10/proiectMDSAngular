import { Component, Input } from '@angular/core';
import { openClosedAnimation } from 'app/animations';
import { Postare } from '../postare/postare.model';

@Component({
   selector: 'mds-feed',
   templateUrl: './feed.component.html',
   styleUrls: ['./feed.component.scss'],
   animations: [openClosedAnimation]
})

export class FeedComponent {
   @Input() posts: Postare[] = [
      {
         description: 'Beautiful sunset view',
         urls: [
            'https://www.garbo.ro/storage/slideshows/15195__1591712512.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Sunset_2007-1.jpg/1280px-Sunset_2007-1.jpg',
            'https://www.garbo.ro/storage/slideshows/15202__1591713028.jpg'
         ]
      },
      {
         description: 'Cute puppy alert!',
         urls: [
            'https://thumbs.dreamstime.com/b/cute-alert-puppy-dog-veterinary-doctor-getting-pa-cute-alert-puppy-dog-veterinary-doctor-getting-paw-127468352.jpg',
            'https://3.bp.blogspot.com/-34S2qyHeR4o/U1pNq3KYcaI/AAAAAAAAByI/aWS-WzIrOpk/s1600/IMG_8123.JPG'
         ]
      },
      {
         description: 'Amazing landscape',
         urls: [
            'https://media.photographycourse.net/wp-content/uploads/2014/11/08164934/Landscape-Photography-steps.jpg '
         ]
      },
      {
         description: 'Yummy food',
         urls: [
            'https://duyt4h9nfnj50.cloudfront.net/resized/1544540478155-w2880-66.jpg',
            'https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1280,h_720,x_0,y_0,c_fill',
            'https://static.toiimg.com/photo/60958241.cms',
            'https://images.snapwi.re/9094/5e6c556415775eda1283b5a2.w800.jpg'
         ]
      },
      {
         description: 'Travel inspiration',
         urls: [
            'https://passionpassport-1.s3.amazonaws.com/wp-content/uploads/2017/12/09195627/travel-inspiration-list-peter-yan.jpg',
            'https://mymodernmet.com/wp/wp-content/uploads/archive/-ZYQ9kiT5bcg9eLNKhWm_1082092011.jpeg?width=750',
            'https://images.squarespace-cdn.com/content/v1/5b916ff59f877014cb9554f3/1559185681090-UYRUS1P7L34EGFBQX4TA/kristine-tanne-1360999-unsplash.jpg?format=1500w'
         ]
      }
   ];
}