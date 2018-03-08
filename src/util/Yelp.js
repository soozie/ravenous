const apiKey = 'SDjZGmRWgfwSxP16vrnGAQsDqlfD5xNvDrDcFyYbrRyR01mUQMFoqTaCacJF7Z3fYAwum2qfcNzmU_LWRlNs5pjDhYuEWnI5-KyaA7FQpxXrT8wDV36r0tWKlGCgWnYx';

// `This object will store the functionality needed to interact with the Yelp API.`
export const Yelp = {
  // `This is the method we’ll use to retrieve search results from the Yelp API.`
  search: (term, location, sortBy) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.address1,
            city: business.city,
            state: business.state,
            zipCode: business.zip_code,
            category: business.categories.map(c => {
              return c.title;
            }).join(', '),
            rating: business.rating,
            reviewCount: business.review_count
          }
        });
      }
    })
  }
};
