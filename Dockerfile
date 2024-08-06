# Pull miniconda from docker hub as base image
FROM continuumio/miniconda3:latest

# Copy the requirements file from local folder to image
COPY ./backend/requirements.yml /backend/requirements.yml

COPY ./scripts /scripts
RUN sed -i 's/\r$//' /scripts/dev.sh #conversion command
RUN chmod +x ./scripts #execute rights on whole scripts dic

# create the environment inside the docker container
RUN conda env create -f /backend/requirements.yml

# we set the path where all the python pacakages are
#puts the path infront of the environment variable path. When conda is started,
#it'll find the first path for a conda env which is now the one built with the requirements.yml
#This is also, how it works on the local machine. There by conda activate env, this will be added to the $PATH
ENV PATH /opt/conda/envs/motion-assignment/bin:$PATH

# activates django env app like conda activate django_app
RUN echo "source activate motion-assignment" >~/.bashrc

ENV PYTHONDONTWRITEBYTECODE=1

# pass all the files and folders from local folder to image
COPY ./backend /backend

# set the working directory to /app for whenever you login into your container
WORKDIR /backend
