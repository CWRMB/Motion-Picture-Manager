create table dbo.MotionPictures(
PictureID int identity(1,1),
PictureName NVARCHAR(50) NOT NULL,
PictureDescription NVARCHAR(500),
PictureRelease int NOT NULL
)

insert into dbo.MotionPictures values ('Pirates','A Movie About Pirates', 2002)
insert into dbo.MotionPictures values ('Top Gun', 'Fighter Pilots', 2022)

select * from dbo.MotionPictures