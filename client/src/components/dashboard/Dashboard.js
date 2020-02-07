import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import Spinner from "../layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <h1 class="large text-primary">Dashboard</h1>
      <p class="lead">Welcome {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          <div class="dash-buttons">
            <a href="edit-profile.html" class="btn btn-light">
              Edit Profile
            </a>
            <a href="add-experience.html" class="btn btn-light">
              Add Experience
            </a>
            <a href="add-education.html" class="btn btn-light">
              Add Education
            </a>
          </div>

          <h2 class="my-2">Experience Credentials</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Company</th>
                <th class="hide-sm">Title</th>
                <th class="hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tech Guy Web Solutions</td>
                <td class="hide-sm">Senior Developer</td>
                <td class="hide-sm">02-03-2009 - 01-02-2014</td>
                <td>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Traversy Media</td>
                <td class="hide-sm">Instructor & Developer</td>
                <td class="hide-sm">02-03-2015 - Now</td>
                <td>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 class="my-2">Education Credentials</h2>
          <table class="table">
            <thead>
              <tr>
                <th>School</th>
                <th class="hide-sm">Degree</th>
                <th class="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Northern Essex</td>
                <td class="hide-sm">Associates</td>
                <td class="hide-sm">02-03-2007 - 01-02-2009</td>
                <td>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="my-2">
            <button class="btn btn-danger">
              <i class="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have yet to make a profile.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profle: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
