const { default: axios } = require('axios')
const { response } = require('express')
const Top10Tickers = require('../models/data')

module.exports.home=function(req,res){
    return res.render('home',{
        title:'Hodlinfo'
    })
}





module.exports.fetch0 = async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    const tickers = Object.values(data)
      .sort((a, b) => b.quote_unit - a.quote_unit)
      .slice(0, 10)
      .map(ticker => ({
        name: ticker.name,
        last: parseFloat(ticker.last),
        buy: parseFloat(ticker.buy),
        sell: parseFloat(ticker.sell),
        volume: parseFloat(ticker.volume),
        base_unit: ticker.base_unit
      }));

    const top10Tickers = new Top10Tickers({ tickers: tickers }); // Ensure correct schema reference
    const savedTickers = await Top10Tickers.insertMany({ tickers }, { wtimeout: 20000 });



    console.log(`${savedTickers.tickers.length} tickers saved to the database`);
    res.send(`${savedTickers.tickers.length} tickers saved to the database`);
   
  } catch (error) {
    console.error('Error fetching or saving tickers:', error);
    res.status(500).send('Error fetching or saving tickers');
  }
};






module.exports.fetch000 = async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    const tickers = Object.values(data)
      .sort((a, b) => b.quote_unit - a.quote_unit)
      .slice(0, 10)
      .map(ticker => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit
      }));

    // console.log(tickers);

    await Top10Tickers.insertMany(tickers);
    console.log('Data inserted successfully');
    return res.render('home',{
      title:'Hodlinfo'
  })
  } catch (error) {
    console.error('Error fetching or inserting tickers:', error);
    res.status(500).json({ error: 'Error fetching or inserting tickers' });
  }
};








module.exports.fetch = async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    const tickers = Object.values(data)
      .sort((a, b) => b.quote_unit - a.quote_unit)
      .slice(0, 10)
      .map(ticker => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit
      }));

    console.log(tickers);

    await Top10Tickers.deleteMany({});
    console.log('Old data removed successfully');

    await Top10Tickers.insertMany(tickers);
    console.log('New data inserted successfully');

    const fetchData=await Top10Tickers.find({})
    return res.render('home',{
      title:'Hodlinfo',
      fetchData
  })
  } catch (error) {
    console.error('Error fetching or inserting tickers:', error);
    res.status(500).json({ error: 'Error fetching or inserting tickers' });
  }
};

