import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/weather' , async(req,res) => {
    const { city } = req.query;

    try 
    {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7`
        )

        if(!response.ok)
        {
            console.error('Weather API responded with the status',response.status);
            return res.status(response.status).json({error:"Failed to fetch"});
        }

        const data = await response.json();
        res.json(data);
    } 
    catch (error) 
    {
        console.error("Weather API error:",error);
        res.status(500).json({error:'Error fetching the weather data'});
    }
})

app.listen(PORT , () => {
    console.log("Server is running on" , PORT);
})