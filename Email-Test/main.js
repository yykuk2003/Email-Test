/**
 * TODO:
 *
 * 1. Fetch all 7 emails using fetchEmailsFromDatabase
 * 2. Throw out responses from fetchEmailsFromDatabase with (error === true), and handle retries
 * 3. Render all emails using renderEmails
 */

 
 let result = [];

function main() {
  // Your Code Here
  fetchEmailsFromDatabase(result.length, (error, {emails, next}) => {
  if(error) {
      main();
  } else if(result.length < 7) {
  result = [...result, ...emails];
  if(next !== null) {
    main();
  }
    }
  });
renderEmails(result)
}

main();

//  ------------ Read But Do Not Make Changes Below This Line ------------

/**
 * A simulated API call to fetch emails. The pagination
 * length is randomly determined.
 * 
 * @param {number} offset - Offset for pagination 
 * @param {function} callback - Has args (error, { emails, next })
 *   error: {boolean}, random error that indicates response should be ignored
 *   emails: {object[]}, results that were fetched from this call
 *   next: {number}, offset pointing to the next page of results, or null if there are no more results.
 */
function fetchEmailsFromDatabase(offset, callback) {
  const allEmails = [
    {
      author: 'Bobby Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Not-Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Obo',
      subject: 'Hey Friendo!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Jenny Jane',
      subject: 'Let me know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Jenny Janey',
      subject: 'Let Jenny know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please DO NOT buy my product.',
      body: `My product is a scam. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please buy my product.',
      body: `My product is the best. For just $1,000 you could buy my product and make me somewhat richer. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
  ];

  const maximum = allEmails.length;
  const paginationLimit = _.random(1, 3);
  const nextOffset = Math.min(offset + paginationLimit, maximum);

  const produceRandomError = () => _.random(1, 10) > 5;

  const arbitraryLatency = _.random(1, 10) * 100;

  setTimeout(() => {
    const error = produceRandomError();

    if (error) {
      callback(error, {
        emails: [],
        next: null
      });
    } else {
      callback(null, {
        emails: allEmails.slice(offset, nextOffset),
        next: offset === maximum ? null : nextOffset,
      });
    }
  }, arbitraryLatency);
}

function renderEmails(emails) {
  const emailListHtml = emails.map(({ author, subject, body }) => {
    return `<li class="email-item">
              <div class="meta-data">
                <span> <b>${author}</b>: ${subject} </span>
                <span> Today <b> 11:07 PM </b> </span>
              </div>
              ${body}
            </li>`;
  });

  $('#js-email-list')
    .empty()
    .append(emailListHtml);
}
