var React = require('react');
var BadgeItem = require('./badgeitem');

var BadgeList = React.createClass({
    isMatch: function (badge) {
        var regexFilter = new RegExp(this.props.filterText, 'i');
        return regexFilter.test(badge.name) ||
            regexFilter.test(badge.title) ||
            regexFilter.test(badge.comment) ||
            regexFilter.test(badge.categoryTags) ||
            regexFilter.test(badge.createdAt.getFullYear());
    },
    queryBadges: function (badge, index, badges) {
        if (this.isMatch(badge)) {
            return true;
        } else if (badge.isGroup) {
            var i = 0,
                len = badge.badges.length;
            for (; i < len; i++) {
                var b = badge.badges[i];
                if (this.isMatch(b))
                    return true;
            }
        }  
    },
    processBadges: function (badge, index, badges) {
        var lastBadge = badges[index - 1];
        if (lastBadge) {
            var lastDate = lastBadge.createdAt;
        }
        return <BadgeItem key={badge.id} badges={badge} lastDate={lastDate} isDescending={this.props.isDescending} />;
    },
    render: function() {
        var directionIcon = 'fa ' + (this.props.isDescending ? 'fa-caret-down' : 'fa-caret-up');
        return (
            <div>
            <div className="sortContainer">
            By Creation Date:
            <div className="direction" onClick={this.props.switchDirection}>
            <i className={directionIcon} /> {this.props.isDescending ? 'Descending' : 'Ascending'}
            </div>
            </div>
            <div className="badgeList">
            {this.props.filterText ? this.props.badges.filter(this.queryBadges).map(this.processBadges) : this.props.badges.map(this.processBadges)}
    </div>
    </div>
    );
}
                                  });

module.exports = BadgeList;