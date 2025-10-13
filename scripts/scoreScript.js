document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded message", "scores loaded");

  console.log(`here's the cookie`, document.cookie);
  
  // Load permanent records from localStorage
  const savedUserName = localStorage.getItem('savedUserName');
  const savedLifetimeScore = localStorage.getItem('lifetimeScore');
  
  // Welcome back message if user has permanent records
  if (savedUserName && savedLifetimeScore) {
    $('body').prepend(`<div class="alert alert-info">Welcome back, ${savedUserName}! Your lifetime score: ${savedLifetimeScore}</div>`);
    $('#userName').val(savedUserName); // Pre-fill username
  }

  // Save username to COOKIE
  $('#btnSaveUserNameCookie').on('click', () => {
    let $userName = $('#userName').val();
    console.log("saving username to cookie:", $userName);

    //remove white space from user name, at start or end. 
    if (!$userName.trim()) {
      return;
    }

    // Set a cookie with expiration
    document.cookie = `userName=${$userName}; path=/; expires=Fri, 31 Dec 2025 23:59:59 GMT`;
    
    // Update score displays
    updateScoreDisplays();

    // Read cookies 
    console.log(`cookie after save:`, document.cookie);
  });

  // Save username to PERMANENT STORAGE (localStorage)
  $('#btnSaveUserNamePermanent').on('click', () => {
    let $userName = $('#userName').val();
    console.log("saving username to localStorage:", $userName);

    if (!$userName.trim()) {
      return;
    }

    // Save to localStorage (permanent)
    localStorage.setItem('savedUserName', $userName);
    
    // Update score displays
    updateScoreDisplays();

    // Log localStorage
    console.log(`localStorage after save:`, localStorage.getItem('savedUserName'));
  });


  // Delete all cookies button
  $('#btnDeleteCookies').on('click', () => {
    console.log("deleting cookies");
    document.cookie = `userName= ; path=/; expires=Fri, 31 Dec 2025 23:59:59 GMT`;
    console.log("cookies after deleting:", document.cookie);

  }); //closes delete cookie button event  

  // Load game score (session) and lifetime score (permanent)
  let gameScore = parseInt(sessionStorage.getItem('gameScore')) || 0;
  let lifetimeScore = parseInt(localStorage.getItem('lifetimeScore')) || 0;
  
  // Function to update displays with user name
  function updateScoreDisplays() {
    const currentUserName = $('#userName').val() || savedUserName || 'Player';
    $('#gameScoreDisplay').text(gameScore);
    $('#lifetimeScoreDisplay').text(lifetimeScore);
    
    // Update the headers with user names - target the h6 elements in the game/lifetime cards
    $('.bg-warning h6').text(`${currentUserName}'s Game Score (Session Storage)`);
    $('.bg-primary h6').text(`${currentUserName}'s Lifetime Score (Local Storage)`);
  }
  
  // Initial display update
  updateScoreDisplays();
  
  console.log(`loaded - game score: ${gameScore}, lifetime score: ${lifetimeScore}`);

  // Add +1 to score button
  $('#btnAddScore').on('click', () => {
    gameScore += 1;
    console.log(`new game score:`, gameScore);
    
    // Save to sessionStorage (temporary - gone when browser closes)
    sessionStorage.setItem('gameScore', gameScore);
    
    // Update display with user name
    updateScoreDisplays();
    
    console.log(`sessionStorage after save:`, sessionStorage.getItem('gameScore'));
  });

  // Reset GAME score only (not lifetime)
  $('#btnResetGame').on('click', () => {
    gameScore = 0;
    console.log(`game score reset to:`, gameScore);
    
    // Save to sessionStorage
    sessionStorage.setItem('gameScore', gameScore);
    
    // Update display with user name
    updateScoreDisplays();
    
    console.log(`sessionStorage after reset:`, sessionStorage.getItem('gameScore'));
  });

  // Save current game score to lifetime total
  $('#btnSavePermanent').on('click', () => {
    const userName = $('#userName').val() || 'Anonymous';
    
    // Add current game score to lifetime total
    lifetimeScore += gameScore;
    
    console.log(`adding game score ${gameScore} to lifetime. New lifetime total: ${lifetimeScore}`);
    
    // Save to localStorage (permanent)
    localStorage.setItem('savedUserName', userName);
    localStorage.setItem('lifetimeScore', lifetimeScore);
    
    // Reset game score after saving
    gameScore = 0;
    sessionStorage.setItem('gameScore', gameScore);
    
    // Update display with user name
    updateScoreDisplays();
    

    
    console.log(`localStorage permanent save - user:`, localStorage.getItem('savedUserName'));
    console.log(`localStorage permanent save - lifetime:`, localStorage.getItem('lifetimeScore'));
  });

  // PERMANENTLY delete all scores
  $('#btnDeleteAll').on('click', () => {
    if (confirm('Are you sure? This will PERMANENTLY delete all scores!')) {
      // Clear everything
      sessionStorage.removeItem('gameScore');
      localStorage.removeItem('lifetimeScore');
      localStorage.removeItem('savedUserName');
      
      // Reset variables
      gameScore = 0;
      lifetimeScore = 0;
      
      // Clear username field
      $('#userName').val('');
      
      // Update displays with user name
      updateScoreDisplays();
      

      
      console.log('All scores permanently deleted');
    }
  });

  // Update displays when username changes
  $('#userName').on('input', () => {
    updateScoreDisplays();
  });

  //todo: reset the game. 

});
