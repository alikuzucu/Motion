FROM continuumio/miniconda3:latest

#creating folder in the container
RUN mkdir -p /backend
RUN mkdir -p /scripts
RUN mkdir -p /static-files
RUN mkdir -p /media-files
RUN mkdir -p /frontend


RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
# Install node js version 20.x
RUN curl https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs




#copy the requirements file from local computer to container
COPY ./backend/requirements.yml /backend/requirements.yml
COPY ./scripts /scripts
RUN chmod +x ./scripts

# creating and running conda env, it will activate when we open terminal
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml
ENV PATH /opt/conda/envs/motion-2/bin:$PATH
RUN echo "source activate motion-2" > ~/.bashrc

# Prevents the genration of PyCache that you might have trouble getting rid of, especially on the server
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /frontend
COPY ./frontend/package.json /frontend/package.json
COPY ./frontend/package-lock.json /frontend/package-lock.json

RUN npm install

COPY ./frontend /frontend
RUN npm run build

# copying rest of the backend folder
COPY ./backend /backend

# this will be the directory that opens at the start
WORKDIR /backend