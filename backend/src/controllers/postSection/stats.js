const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.stats = (req, res) => {
    let impression = [],
        visit = [],
        clicks = [],
        overall = [];

    let q1 = req.query.start
        ? `DATE(t1.timestamp) BETWEEN '${req.query.start}' AND '${req.query.end}'`
        : `t1.timestamp >= NOW() - INTERVAL ${req.params.day} DAY`;
    let q2 = req.query.start
        ? `DATE(t2.timestamp) BETWEEN '${req.query.start}' AND '${req.query.end}'`
        : `t2.timestamp >= NOW() - INTERVAL ${req.params.day} DAY`;

    connection.query(
        `SELECT t1.impression,t4.visit FROM ${SQL.tables.postDataHistory} t1 INNER JOIN ${SQL.tables.users} t3 ON t3.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t1.user_id=${req.user.id} AND ${q1} GROUP BY t1.impression,t4.visit;
    SELECT t2.clicks FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.itemDataHistory} t2 ON FIND_IN_SET(t2.id,t1.item_id) WHERE t1.user_id=${req.user.id} AND ${q2} GROUP BY t2.clicks`,
        (error, data) => {
            if (error) {
                res.json({
                    success: false,
                    message: "Something went wrong",
                });
            } else {
                Array.from(data[0]).map((el) => {
                    impression.push(el.impression);
                    visit.push(el.visit);
                });
                Array.from(data[1]).map((el) => clicks.push(el.clicks));
                overall = [...sumArrays(impression, visit, clicks)].map((el) =>
                    parseInt(el / 3)
                );
                let x_impression = (
                        (req.params.day * 24) /
                        impression.length
                    ).toFixed(2),
                    x_visit = ((req.params.day * 24) / visit.length).toFixed(2),
                    x_clicks = ((req.params.day * 24) / clicks.length).toFixed(
                        2
                    ),
                    x_overall = (
                        (req.params.day * 24) /
                        overall.length
                    ).toFixed(2);

                res.json({
                    success: true,
                    data: {
                        impression: {
                            x: Array.from({ length: impression.length }).map(
                                (x, i) => i * x_impression
                            ),
                            y: impression,
                        },
                        max_impression: Math.max(...impression),
                        visit: {
                            x: Array.from({ length: visit.length }).map(
                                (x, i) => i * x_visit
                            ),
                            y: visit,
                        },
                        max_visit: Math.max(...visit),
                        clicks: {
                            x: Array.from({ length: clicks.length }).map(
                                (x, i) => i * x_clicks
                            ),
                            y: clicks,
                        },
                        max_clicks: Math.max(...clicks),
                        overall: {
                            x: Array.from({ length: overall.length }).map(
                                (x, i) => i * x_overall
                            ),
                            y: overall,
                        },
                        max_overall: Math.max(...overall),
                    },
                });
            }
        }
    );
};

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
    );
}
