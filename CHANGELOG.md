# Changelog
All notable changes to this project will be documented in this file.

The format is based on
[Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

This project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v3.2.3] - 2019-03-12
### Fixed
- Honor task priorities when loading the next random task
- Allow task completion for non-final task statuses (e.g. Skipped)
- Scroll browsed challenge into view when navigating directly to it (#668)
- Permission error when navigating directly to project admin (#665)
- Missing busy spinner on sign-in buttons while determining login status
- "Owned" filter in admin projects not always showing owned projects
- CSV export URLs that could be incorrect for some server configurations
- Removed extraneous scrollbars
- Error when viewing an empty leaderboard
- Unreadable challenge-progress labels on hover
- Various minor visual fixes


## [v3.2.2] - 2019-02-28
### Added
- Offer "Not an Issue" on step 2 of task completion
- Zoom JOSM to task map bounding box after loading just features

### Fixed
- Ensure OSM Data Layer is deactivated after completing a task


## [v3.2.1] - 2019-02-25
### Added
- Create & Manage widget for managing project managers (#534)

### Fixed
- Excessive removal of unmatched tasks for line-by-line geojson by @Zverik
- Error when attempting to display zero points in points ticker
- Disallowed task status progressions sometimes offered in task completion
- Dropdown menus extending over widgets sometimes not fully interactive
- Modals sometimes appear behind widgets instead of in front of them
- Incorrect rendering of user settings form in Chrome

### Changed
- Name of User Profile page to User Settings

### Removed
- Tabs on Create & Manage project cards; only challenges are now shown


## [v3.2.0] - 2019-02-15
### Added
- New user interface
- Full-fledged home page (#426)
- New user dashboard page with quick access to challenges of interest (#521)
- Highlight new challenges (#509)
- Highlight popular challenges (#447)
- Task completion page is now widget based
- Access to all task-completion statuses from step 1 of task completion
- Points ticker in top-nav to see current score
- Updated README

### Fixed
- Require sign-in before naming a new virtual challenge (#579)
- Multiple trash cans in challenge-administration confusing (#529)

### Changed
- Create & Manage link has moved to dropdown menu in top nav
- The term "review" for spot-checking new tasks is now called "inspect"
- User now needs to be signed in prior to viewing task completion page
- [internal] redux store is no longer persisted
- [internal] back-end now treated as pure API server


## [v3.1.3] - 2019-02-05
### Added
- Support for [simplestyle](https://github.com/mapbox/simplestyle-spec) task-feature styling by @zverik
- Korean translation by @depth221
- OSM Data map layer with latest OSM data during task completion
- New keyboard shortcuts available during task completion: `s` to toggle
  visibility of the task-features layer and `o` to toggle the new OSM data
  layer on/off
- Display of logged-in user's leaderboard ranking even if not in top list
- Country-specific leaderboards
- Option to show more users on leaderboard to view further down the rankings
- Move discovery map with Nominatum search using `m/` search-box short command, e.g. `m/moscow`
- Display of total elapsed time when challenge tasks are building
- Display of count and percentage of tasks remaining alongside challenge progress

### Fixed
- Typo in Japanese translation by @higa4
- Missing "Manage" option when challenge owner browsing non-visible challenge
- Inability to remove default changeset comment from existing challenge

### Changed
- "Create" top-nav link is now "Create & Manage" to improve clarity
- Show Lon/Lat of task on task completion page instead of Lat/Lon


## [v3.1.2] - 2019-01-10
### Added
- Japanese translation by @higa4
- Allow commenting when reviewing task as a challenge owner (#138)
- Option to edit only task features in JOSM (#452)
- Include challenge search/filter criteria in URL for permalinking (#526)
- Public challenge- and project-specific leaderboards (#536)
- Allow longitudinal wrapping of maps (#593)
- Offer "near me" challenge location search to signed-out users
- Search-box short-command `m/` to move map to bounding box or centerpoint
- Paging in admin area to improve performance for users managing a lot of
projects and/or challenges
- Option to clear filters when analyzing challenge tasks in admin area
- Support numerical values and operators in challenge priority rule definitions
- Minor optimizations to reduce number of network requests
- [internal] Support front-end development without requiring installation of
local back-end development server

### Fixed
- Formatting fix in README by @kant
- Failure to clone challenges that used legacy basemaps (#549)
- Extraneous backslashes in custom basemap examples (#575)
- Confusing error message if browser window too narrow in admin area

### Changed
- keyboard shortcut key for opening Level0 editor is now `v` instead of `l`
- The "about" modal dialog has been changed to a simple home page as a placeholder
for an upcoming home page implementation

### Removed
- [internal] chimp end-to-end testing framework temporarily removed for Node.js 10
compatibility


## [v3.1.1] - 2018-11-12
### Added
- Mapillary map layer when completing tasks
- Support rebuild of challenges sourced from local or remote GeoJSON (#527)
- Option to remove unmatched tasks on challenge rebuild to reduce stale tasks
- Control to load more challenge results in search results
- Public leaderboards for each challenge (#536)

### Fixed
- Fix lag when typing a search query
- Show GeoJSON validation errors (lost in line-by-line enhancement)
- Allow switch to different GeoJSON source even after prior source had error
- Reduce extraneous scrollbars from Create dashboard (#519)


## [v3.1.0] - 2018-10-30
### Added
- Add more keyboard shortcuts for task completion (#477).
- Show age of tasks when browsing a challenge (#468).
- Show the lat/lon of task under Location (#467).
- Offer default layers and overlays from OSM Editor Layer Index (#466).
- Allow mustache tags in instructions that reference task properties (#456).
- New flexible, widget-based project/challenge administration interface (#450).
- When showing tasks on search map, indicate how many tasks are shown (#435).
- Support for Level0 editor (#423).
- Sort control for challenge results (#211).
- Help link in top navbar (#72).
- Support for streamable line-by-line GeoJSON format.
- Advanced option for challenge-owners to ignore detected GeoJSON errors.
- Support for map overlays.
- Use browser geolocation service for Near Me filter when available.
- Open links in markdown content in new tabs.

### Fixed
- Don't prompt user to login if page doesn't require it (#492).
- Don't prematurely display that a challenge is complete (#429, #458).
- Don't preserve zoom if task features won't fit on map (#451).
- Fix labels cut off on some charts (#448).
- Don't re-encrypt user API key on user profile updates (#437, #442).
- Allow challenge source to be modified if tasks fail to build (#436).
- User could sometimes receive duplicate task with old status (#428).
- Don't enable reset-tasks control for challenge owners if no tasks selected.
- Don't show challenges with no remaining tasks in search results (#464).

### Changed
- Allow user to skip task after opening editor (#469).
- Do not allow modification of priority for individual tasks (#390).
- [internal] Refactor challenge search to use unified service.


## [v3.0.6] - 2018-07-02
### Added
- Map control to fit task-completion map to task features.
- Animate task features on map when new task loads.
- Auto-suggest for challenge keywords when creating a challenge.
- Jump to desired workflow step when editing a challenge.
- Option to save-and-finish early when editing a challenge.
- Various enhancements to experimental mobile support.

### Fixed
- Don't offer edit-task link in admin task-map popup to project owners with
  read-only access.
- Inconsistent whitespace on user profile page.

### Changed
- Reuse task-completion map between tasks, preserving settings (#298).


## [v3.0.5] - 2018-06-22
### Added
- Congratulate user when a challenge is completed (#112).
- Challenge owners can set individual tasks to any status (#387).
- Challenge owners can bulk reset tasks to Created stauts (#326).
- Challenge owners can move challenges between projects (#328).
- Administration of project managers.
- Support for Read, Write, and Admin project manager roles.
- Improved handling of server authentication and authorization errors.
- Changeset source field on challenges with JOSM prefill (#361).

### Fixed
- Ensure latest API key displayed after multiple consecutive resets.
- Cloning a challenge could fail in some scenarios.
- Ensure all challenges shown to challenge owner (#396).

### Changed
- Relocated comments on task-completion sidebar (#296).


## [v3.0.4] - 2018-06-08
### Added
- Option on user profile page to reset API key
- Button on user profile page to copy API key to clipboard


## [v3.0.3] - 2018-06-08
### Security
- Prevent non-managers from viewing challenge admin page when following a
  direct link (#383).


## [v3.0.2] - 2018-06-04
### Added
- Allow all users to create new projects.
- New "Intersecting Map Bounds" challenge location filter.
- Experimental (disabled by default) basic support for mobile devices.
- Add last-activity date to challenge overview table (#221).
- Update README documentation.
- [internal] Upgrade various package dependencies, including React.

### Fixed
- Very slow edit-challenge forms for some challenges (#370).
- Refresh results from server after changes to challenge filters.

### Changed
- "Within Map Bounds" challenge location filter now only displays challenges
  centered within the map bounds. Its prior behavior of including any
  challenges with intersecting bounding boxes is represented by the new
  "Intersecting Map Bounds" filter (#88).
- Default to https for tile-server and other URLs.


## [v3.0.1] - 2018-05-15
### Added
- Additional error page for use by server in some situations.

### Fixed
- Navigating directly to non-existent task spins forever (#357).
- Export of challenge tasks CSV for challenge owners not working properly on
  Windows (#359).

### Removed
- Nav link to old UI


## [v3.00] - 2018-05-10
### Removed
- Beta badge and beta-specific introductory language.


## [v3.00-beta.8] - 2018-05-01
### Added
- Experimental (disabled by default) challenge overview table when viewing
  a project in admin area (#331).

### Fixed
- Admin project stats not restricted to currently-open project (#339).
- Incorrect display of wide or tall profile pics (#340).
- Admin area sometimes requires page refresh to show all challenges managed
  by user (#341).
- Users with slower connections could temporarily see erroneous warning about
  missing home project in admin area (#342).
- Confusing instructions around local file uploads when editing an existing
  challenge (#349).

### Changed
- Heatmap calendars in admin are now shown horizontally instead of vertically.


## [v3.00-beta.7] - 2018-04-25
### Added
- Ability to also search by challenge name in admin search (#205).
- Public leaderboard of top scoring users across various timeframes (#254).
- Leaderboard opt-out setting in User Profile.
- Challenge-specific leaderboards for challenge owners in admin area (#316).
- Display of user's own top challenges (by activity) on user profile page.
- Notice to challenge owners after creating or updating challenge that
  it can take up to 2 hours to complete geographic indexing (#234).
- MIT license for project (#295).

### Fixed
- Already-complete challenges included in search results (#283).
- Misaligned task-control buttons for some users (#323).
- Typo in link to Overpass guide fixed by @naoliv
- Busy indicator spins forever when attempting to browse a
  challenge pending deletion (#332).
- No error shown when admin attempts to navigate to non-existent
  challenge (#333).


## [v3.00-beta.6] - 2018-04-17
### Added
- Ability to delete projects (#243).
- [internal] End-to-end test setup with some initial tests.

### Fixed
- Wrapping of long challenge names on User Profile page (#300).
- Link for challenge owners to view task associated with comment (#299).


## [v3.00-beta.5] - 2018-04-09
### Added
- Require confirmation before rebuilding tasks.
- Automatic updates of task-build progress.
- Detect use of Overpass Turbo query shortcuts in Overpass queries (#256).
- Display of Challenge keywords in admin View Challenge sidebar (#244).
- Visibility quick-toggle in admin View Challenge sidebar (#183).
- Option to automatically add #maproulette hashtag to changeset comment (#290).
- Styling of user profile page (#276).
- User activity feed grouping by challenge (#28).
- Styling adjustments to admin forms (edit challenge, edit task, etc).
- Example PIWIK settings in .env file.

### Changed
- Only offer task rebuilding to challenges built from Overpass queries.
- Challenge source now read-only once tasks are built (#236).

### Fixed
- Include disabled projects in admin project search results.
- Display map-bounded tasks even if parent challenge previously unseen (#279).
- Don't allow map to wrap around world (#277).


## [v3.00-beta.4.2] - 2018-04-04
### Fixed
- Some challenges erroneously converted to N/A status (#284).


## [v3.00-beta.4.1] - 2018-04-03
### Fixed
- Treat missing challenge status as N/A (#275).


## [v3.00-beta.4] - 2018-04-02
### Added
- Reduce duplicate/unnecessary network requests to server.
- Offer challenge and user custom basemaps on map layer toggle (#218).
- Link app version number in About modal to release notes (#241).
- Basic management options for challenge owners when browsing a challenge
  they manage or working on tasks in challenges they manage (#245)
- Quick-share control next to challenge name when working on tasks (#231).
- Show task count to challenge owners as new challenge builds (#235).
- CSV export of tasks table for challenge owners (#124).
- Mobile landing page (#263).

### Changed
- GeoJSON validation failures no longer show line numbers.

### Fixed
- Safari extremely slow validating uploaded GeoJSON (#222).
- Tolerate task GeoJSON with missing features.
- Avoid bouncing between two tasks when skipping (#220).
- URL used to start a virtual challenge when clicking a task on map (#257).
- Tooltips in Firefox on minimized sidebar when working on tasks (#255).
- Show tasks to challenge owner for partially-loaded challenges (#264).
- Tolerate load of project data when challenge owner viewing challenge.
- Don't skip rendering of locator map when no clustered tasks.
- Don't offer Start Challenge control to challenge owners if the challenge
  has no tasks (#271).

### Removed
- Next Task option for end users when viewing a task with an existing status if
  that task can still reasonably be assigned a new status by the user.

## [v3.00-beta.3.1] - 2018-03-28
### Fixed
- Infinite loop browsing non-existent or disabled challenge (#246).
- Collapsing of browsed challenge (#247).


## [v3.00-beta.3] - 2018-03-26
### Added
- Virtual challenges created from map-bounded tasks now exactly match
  tasks displayed on the map.
- Support browsing virtual challenges via direct URL.
- Visual indicator when working on, or browsing, a virtual challenge.
- Display reason if creation of virtual challenge fails.
- Notify user if attempt is made to work on an expired virtual challenge.
- Renew virtual challenge expiration when there is new activity on it.
- Allow virtual challenge duration to be configured via .env file.
- Move extra task controls into new collapsible "More Options" section (#189).
- Toggling of task-features layer on or off when working on tasks (#202).
- Challenge progress bars now reflect task-status breakdown (#201).
- Performance improvements to challenge results-list rendering.
- More informative message to challenge owner if challenge has no GeoJson.
- Reason for failure to build tasks now shown to challenge owner (#86).
- Various minor user interface tweaks and improvements.

### Changed
- GeoJSON tab in challenge creation/editing is now optional (#200)

### Fixed
- Challenge status is no longer carried over when cloning a challenge.
- Challenge data is properly loaded when following a browse link (#224).


## [v3.00-beta.2] - 2018-03-19
### Added
- Back-to-MR2 banner link in navbar (#172).
- Heatmap calendar of task activity for challenge owners.
- Support for `osmIdentifier` as OSM id property in GeoJSON.
- Application of challenge filters to (experimental) map-bounded tasks.
- Validation of locally-uploaded GeoJSON when creating/editing a challenge.
- Syntax highlighting of GeoJSON when viewing a task as challenge owner.
- Tag-style input of additional keywords when creating/editing a challenge.
- Support for rebuilding challenges.
- Support for custom keyword category configuration in .env file.

### Changed
- Burn-down charts for challenge owners now go back to the creation
  date of the project/challenge in question.
- Challenge names shown in results are no longer start-cased.

### Fixed
- User profile page is now more resilient to slow-loading or incomplete data
  (#177).
- Prevent stale map data from inadvertently being sent to editors (#180).


## [v3.00-beta.1] - 2018-03-12
### Added
- Option to clone challenge for challenge owners (#84).
- Saving indicator for user settings (#154).
- Option to contact challenge owner when completing a task (#71).
- Support for OpenCycleMap API key.
- Support for asynchronous challenge deletion (#108).
- Task priority filtering for challenge owners.
- Task priority column in task list table for challenge owners.

### Changed
- Reorganized project management for challenge owners.
- Switched charting libraries.
- Updated content to reflect initial beta release (#153). 
- Limit task clustering to max of 15,000 tasks.

### Fixed
- Bing layer no longer blank at high zoom (#76).
- Honor project visibility on challenge search.


## [v3.00-alpha.7] - 2018-03-05
### Added
- Localization and partial translations for fr, es, de, and af locales derived
  from existing translations in MR2 project (#136).
- User settings for locale, default editor, and custom basemap on the
  User Profile page (#83).
- Experimental support (disabled by default) for map-bounded task browsing and
  creation of virtual challenges (#135).
- Display challenge last-modified timestamp to challenge owners (#142).
- Offer edit and modify controls in task-review mode (#139).

### Changed
- Update styling on View Challenge page for challenge owners.
- Change label of Fix button to "Edit" (#140).
- Other minor styling and labeling updates.

### Fixed
- Honor challenge and user custom basemaps (#144).


## [v3.00-alpha.6] - 2018-02-26
### Added
- Visual priority-rule builder for tasks when creating/editing challenges.
- Support for overpass turbo `@id` feature property when editing tasks.
- Live preview of Markdown content during editing.
- Restoration of challenge-owner map state when returning to it (#123).
- Option for challenge-owners to export challenge comments as CSV.

### Changed
- Users can comment on a task regardless of task status (#113).
- Ignore unclustering setting on challenge-owner map and always cluster tasks
  if more than 1000 tasks would be visible.
- Unclustering option only shown when at most 1000 tasks would be visible.

### Fixed
- Don't fetch task data if tasks are still building or failed to build (#127).
- Properly url-encode comments sent to external editors.


## [v3.00-alpha.5] - 2018-02-19
### Added
- Support Matomo/PIWIK analytics integration (#30).
- Add task review mode for challenge owners.
- Show task map and table to challenge owners when managing a challenge.
- Indicate to challenge owners if challenge tasks are still being built
  (or failed to build) when managing a challenge (#85).
- Offer cancel controls on various forms used by challenge owners.
- Show popup with task properties when feature is clicked on map while
  working on a task.
- Add user control for determining whether subsequent tasks in a challenge
  are loaded by random or by geographic proximity.

### Changed
- Improve labels and descriptions of project, challenge, and task form fields
  for challenge owners during the creation and editing process.
- Challenge tasks now load randomly by default, rather than by
  geographic proximity. This can be managed by the user on a per-challenge
  basis (#82).

### Fixed
- Fix clicking on project name as challenge owner when project search yields a
  single result (#116).
- Internationalize keyboard-shortcut labels.


## [v3.00-alpha.4] - 2018-02-12
### Added
- Dedicated route for challenge browse mode so it can be linked to directly.
- Show busy indicator while loading task clusters on challenge map (#64).
- When working on a task, challenge name now links back to browse mode (#79).
- Provide visual cue to user when moving to next task (#75).
- New control to clear all challenge filters (#60).
- Make initial zoom values when creating a challenge configurable in .env file.
- README section on how to update to the latest code.
- Other minor enhancements.

### Changed
- Mute comment-icon badge color when no comments (#53).
- Declutter create-and-manage pages for non-superusers.
- Increased zoom of task inset map, and added extent map (#23).
- Reuse Id editor tab instead of opening a new one for each task (#54).
- Start challenges with a task visible on the current map when possible (#63).
- Social sharing of a challenge now links to browse-mode.
- Saved Challenge links on user profile page now link to browse mode.
- Refer to "saving" a task as "tracking" the task to avoid confusion. (#81)
- Represent tracking a task as a switch instead of a button.

### Fixed
- Correctly map challenges with missing bounding polygon (#57).
- Correctly map tasks with missing location points (#6).
- Don't offer owners Start Challenge link on challenges in failed status (#80).
- Create/Edit challenge form shows that instructions field is required (#73).

### Removed
- Project filtering in create-and-manage for users with single project.


## [v3.00-alpha.3] - 2018-02-05
### Added
- Add metrics tab to to View Projects page sidebar.
- Show task clusters on locator map when browsing a challenge.
- Allow user to start a task by clicking on a task marker on map.
- Allow task instructions to be collapsed/minimized (#29).
- Allow social sharing to be disabled.
- Require confirmation from user before deleting a challenge.
- Add link to start challenge on View Challenge page (#35).
- Other minor improvements.

### Changed
- Improve local map-bounded searches by utilizing challenge bounding data.
- Modularize lodash functions to reduce size of MR3 distribution file.
- Don't show duplicate errors to user in event of multiple failures.
- Make existing task status more visually obvious when completing a task.

### Fixed
- Fix task completion button layout (#39).
- Fix create-and-manage headings on smaller desktop screens (#36).
- Fix user experience around deleting challenges (#37).

### Removed
- Temporarily remove delete project control.


## [v3.00-alpha.2] - 2018-01-29
### Added
- Begin roughing out View Project in create-and-manage area.
- CHANGELOG.md file

### Changed
- Numerous visual fixes and changes, especially around task completion.
- README updated

### Fixed
- Fix unit tests to run in any timezone.
- Allow completion comment to be submitted from Step 2 of task completion (#8).
- Fix erroneous challenge searches (#14, #16, #20)
- Only show allowed status controls based on existing task status (#3)
- Varous visual fixes (#4, #9)


## [v3.0.0-alpha.1] - 2018-01-24
### Added
- Initial release
