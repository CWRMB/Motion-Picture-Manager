using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MotionPicture_API.Models;

namespace MotionPicture_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotionPictureController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public MotionPictureController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            // Using raw query to get straight from the data base json string for simplicity.
            string query = @"select PictureID, PictureName, PictureDescription, PictureRelease from
                dbo.MotionPictures";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MotionPicturesConn");
            SqlDataReader myReader;
            using(SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    // Read from database and add to table
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult(table);
        }

        // Add new values to the data base
        [HttpPost]
        public JsonResult Post(MotionPicture pic)
        {
            // Using raw query to get straight from the data base json string for simplicity.
            string query = @"insert into dbo.MotionPictures 
                (PictureName, PictureDescription, PictureRelease) values (@PictureName, @PictureDescription, @PictureRelease)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MotionPicturesConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    // Add values from our data class MotionPicture.cs
                    myCommand.Parameters.AddWithValue("@PictureName", pic.PictureName);
                    myCommand.Parameters.AddWithValue("@PictureDescription", pic.PictureDescription);
                    myCommand.Parameters.AddWithValue("@PictureRelease", pic.PictureRelease);

                    // Read from database and add to table
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        // Update table column information
        [HttpPut]
        public JsonResult Put(MotionPicture pic)
        {
            // Using raw query to get straight from the data base json string for simplicity.
            string query = @"update dbo.MotionPictures 
                set PictureName=@PictureName, PictureDescription=@PictureDescription, PictureRelease=@PictureRelease
                where PictureID=@PictureID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MotionPicturesConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    // Add values from our data class MotionPicture.cs
                    myCommand.Parameters.AddWithValue("@PictureID", pic.PictureID);
                    myCommand.Parameters.AddWithValue("@PictureName", pic.PictureName);
                    myCommand.Parameters.AddWithValue("@PictureDescription", pic.PictureDescription);
                    myCommand.Parameters.AddWithValue("@PictureRelease", pic.PictureRelease);
                    // Read from database and add to table
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        // Delete method to delete item(s) from table
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            // Using raw query to get straight from the data base json string for simplicity.
            string query = @"delete from dbo.MotionPictures 
                where PictureID=@PictureID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MotionPicturesConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    // Add values from our data class MotionPicture.cs
                    myCommand.Parameters.AddWithValue("@PictureID", id);
                    // Read from database and add to table
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

    }
}
